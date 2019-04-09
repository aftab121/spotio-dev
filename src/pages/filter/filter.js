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
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FilterPage = /** @class */ (function () {
    function FilterPage(navCtrl, navParams, datePicker, calendar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePicker = datePicker;
        this.calendar = calendar;
        this.clear = false;
        this.dateFilter = {};
        this.Status = {};
        this.assignee = {};
        this.todo = {};
        this.filter = 1;
        this.Status = {
            isCustom: false,
            notConnected: false,
            notHome: false,
            notInterested: false,
            lead: false,
            sold: false
        };
        this.dateFilter = {
            today: false,
            yesterday: false,
            thisWeek: false,
            lastWeek: false,
            thisMonth: false,
            lastMonth: false,
            thisYear: false,
            lastYear: false
        };
        this.assignee = [
            {
                Name: "Avinash singh",
                id: "avi",
                isChecked: false
            },
            {
                Name: "Tauqeer Ahmad",
                id: "taq",
                isChecked: false
            }
        ];
        /*this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => console.log('Got date: ', date),
          err => console.log('Error occurred while getting date: ', err)
        );*/
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
        });
        var data1 = this.Status;
        Object.keys(data1).forEach(function (key) {
            _this.Status[key] = false;
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
    FilterPage.prototype.changeFilter = function (val) {
        this.filter = val;
    };
    FilterPage.prototype.goToMap = function () {
        this.navCtrl.pop();
    };
    FilterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filter',
            templateUrl: 'filter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DatePicker, Calendar])
    ], FilterPage);
    return FilterPage;
}());
export { FilterPage };
//# sourceMappingURL=filter.js.map