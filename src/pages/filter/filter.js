var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { FilterProvider } from '../../providers/filter/filter';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilterPage = /** @class */ (function () {
    function FilterPage(navCtrl, navParams, datePicker, calendar, filterService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePicker = datePicker;
        this.calendar = calendar;
        this.filterService = filterService;
        this.clear = false;
        this.dateFilter = {};
        this.Status = [];
        this.assignee = [];
        this.data_filter = [];
        this.date = [];
        this.id = 0;
        this.newModel = [];
        this.todo = {};
        this.filter = 1;
        this.getUserList();
        this.getStatus();
        this.dateFilter = ({
            today: false,
            yesterday: false,
            thisWeek: false,
            lastWeek: false,
            thisMonth: false,
            lastMonth: false,
            thisYear: false,
            lastYear: false,
            custom: false
        });
    }
    FilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterPage');
    };
    FilterPage.prototype.ClearSelection = function () {
        var _this = this;
        this.clear = false;
        var data = this.dateFilter;
        Object.keys(data).forEach(function (key) {
            _this.dateFilter[key] = false;
            _this.date = [];
            _this.data_filter = [];
        });
        var data1 = this.Status;
        Object.keys(data1).forEach(function (key) {
            _this.Status[key]['isChecked'] = false;
        });
        var data2 = this.assignee;
        Object.keys(data2).forEach(function (key) {
            _this.assignee[key]['isChecked'] = false;
        });
    };
    FilterPage.prototype.LoginRemCheck = function (data) {
        var i = 0;
        Object.keys(data).forEach(function (key) {
            if (data[key] == true) {
                i++;
            }
        });
        if (i > 0) {
            this.clear = true;
        }
    };
    FilterPage.prototype.DateCheck = function (data) {
        var _this = this;
        var i = 0;
        Object.keys(data).forEach(function (key) {
            if (data[key] == true) {
                i++;
                _this.DateConvert(key, true);
                _this.clear = true;
                return true;
            }
        });
    };
    FilterPage.prototype.changeFilter = function (val) {
        this.filter = val;
    };
    FilterPage.prototype.goToMap = function () {
        this.data_filter = [];
        for (var key in this.Status) {
            if (this.Status[key].isChecked) {
                if (this.data_filter['status'] != null || this.data_filter['status'] != undefined) {
                    this.data_filter['status'] = this.data_filter['status'] + ',' + this.Status[key].id;
                }
                else {
                    this.data_filter['status'] = this.Status[key].id.toString();
                }
            }
        }
        for (var key in this.assignee) {
            if (this.assignee[key].isChecked) {
                if (this.data_filter['assigned_to'] != null || this.data_filter['assigned_to'] != undefined) {
                    this.data_filter['assigned_to'] = this.data_filter['assigned_to'] + ',' + this.assignee[key].id;
                }
                else {
                    this.data_filter['assigned_to'] = this.assignee[key].id.toString();
                }
            }
        }
        for (var key in this.date) {
            if (this.date[key].isChecked) {
                if (this.date[key].day == "custom") {
                    if (this.date[key].from != '' && this.date[key].to != null) {
                        this.data_filter['start_date'] = this.myDate1;
                        this.data_filter['end_date'] = this.myDate2;
                    }
                    else {
                        this.data_filter['custom_date'] = this.date[key].from != '' ? this.date[key].from : this.date[key].to;
                    }
                }
                else if (this.date[key].day != "today" && this.date[key].day != "yesterday") {
                    this.data_filter['start_date'] = this.date[key].from;
                    this.data_filter['end_date'] = this.date[key].to;
                }
                else {
                    this.data_filter['custom_date'] = this.date[key].to;
                }
            }
        }
        this.navCtrl.setRoot('MapPage', { filter: this.data_filter });
        //this.navCtrl.pop();
    };
    FilterPage.prototype.getStatus = function () {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.filterService.getPin(userid).then(function (result) {
            if (result.resCode == 1) {
                _this.Status = result.data;
            }
        });
    };
    FilterPage.prototype.getUserList = function () {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.filterService.getUser(userid).then(function (result) {
            if (result.resCode == 1) {
                _this.assignee = result.data;
            }
        });
    };
    FilterPage.prototype.getFirstLastDayOfLastWeek = function (userDate) {
        var result = {};
        var curr = new Date(userDate); // get current date
        var last = (curr.getDate() - 1) - curr.getDay(); // First day is the day of the month - the day of the week
        var first = last - 6; // last day is the first day + 6
        var firstDay = new Date(curr.setDate(first));
        var lastDay = new Date(curr.setDate(last));
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.getFirstLastDayOfthisWeek = function (userDate) {
        var result = {};
        var curr = new Date(userDate); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstDay = new Date(curr.setDate(first));
        var lastDay = new Date(curr.setDate(last));
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.getFirstLastDayOfthisMonth = function () {
        var result = {};
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.getFirstLastDayOflastMonth = function () {
        var result = {};
        var date = new Date(), y = date.getFullYear(), m = date.getMonth() - 1;
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.getFirstLastDayOfthisYear = function () {
        var result = {};
        var firstDay = new Date(new Date().getFullYear(), 0, 1);
        var lastDay = new Date(new Date().getFullYear(), 11, 31);
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.getFirstLastDayOflastYear = function () {
        var result = {};
        var firstDay = new Date(new Date().getFullYear() - 1, 0, 1);
        var lastDay = new Date(new Date().getFullYear() - 1, 11, 31);
        result = {
            firstDay: firstDay.getDate + '-' + firstDay.getMonth + '-' + firstDay.getFullYear,
            lastDay: lastDay.getDate + '-' + lastDay.getMonth + '-' + lastDay.getFullYear
        };
        return result;
    };
    ;
    FilterPage.prototype.customDateTime = function () {
        this.date = [];
        this.date.push({ from: this.myDate1 != undefined ? this.myDate1 : '', to: this.myDate2 != undefined ? this.myDate2 : '', isChecked: true, day: 'custom' });
    };
    FilterPage.prototype.DateConvert = function (type, isChecked) {
        this.date = [];
        if (isChecked == true) {
            switch (type) {
                case "today":
                    this.date.push({ from: '', to: new Date().toString(), isChecked: true, day: type });
                    break;
                case "yesterday":
                    this.date.push({ from: '', to: (new Date().getDate() - 1).toString(), isChecked: true, day: type });
                    break;
                case "thisWeek": {
                    var dt = this.getFirstLastDayOfthisWeek(new Date().toString());
                    this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                    break;
                }
                case "lastWeek": {
                    var dt = this.getFirstLastDayOfLastWeek(new Date().toString());
                    this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                    break;
                }
                case "thisMonth":
                    {
                        var dt = this.getFirstLastDayOfthisMonth();
                        this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                        break;
                    }
                case "lastMonth":
                    {
                        var dt = this.getFirstLastDayOflastMonth();
                        this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                        break;
                    }
                case "thisYear":
                    {
                        var dt = this.getFirstLastDayOfthisYear();
                        this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                        break;
                    }
                case "lastYear":
                    {
                        var dt = this.getFirstLastDayOflastYear();
                        this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day: type });
                        break;
                    }
                default:
                    // code...
                    break;
            }
        }
        /*else {
            debugger;
            this.date.forEach(function(value) {
                if (value.day == type) {
                    this.date.splice(value, 1);
                }
            })
        }*/
    };
    FilterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filter',
            templateUrl: 'filter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DatePicker, Calendar, FilterProvider])
    ], FilterPage);
    return FilterPage;
}());
export { FilterPage };
//# sourceMappingURL=filter.js.map