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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CreateAppointmentPage } from '../../pages/create-appointment/create-appointment';
import { AppointmentProvider } from '../../providers/appointment/appointment';
/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(alertCtrl, navCtrl, navParams, calendar, appointmentService) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.appointmentService = appointmentService;
        this.slidenum = 0;
        this.date = new Date();
        this.eventList = [];
        this.allEvents = [];
        this.firstdate = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00");
        this.seconddate = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate() + 1) + " 23:59:59");
        this.selecteddt = false;
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.getAllEvents();
        /* debugger;
         var element=document.querySelector('.currentDate');
         console.log(element.className);*/
    }
    AppointmentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AppointmentsPage');
        // this.getDaysOfMonth();
        // this.loadEventThisMonth();
    };
    /*onSlideChanged(e, m) {
      var month = m;
      let currentIndex = this.slider.getActiveIndex();
      console.log("You are on Slide ", (currentIndex + 1));
    }*/
    AppointmentsPage.prototype.getDaysInLastMonth = function (month) {
        this.daysInLastMonth = new Array();
        var firstDayThisMonth = new Date(this.date.getFullYear(), month, 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), month, 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }
        return this.daysInLastMonth;
    };
    AppointmentsPage.prototype.getDaysInNextMonth = function (month) {
        this.daysInNextMonth = new Array();
        var lastDayThisMonth = new Date(this.date.getFullYear(), month + 1, 0).getDay();
        var nextNumOfDays = new Date(this.date.getFullYear(), month + 2, 0).getDate();
        for (var k = 0; k < (6 - lastDayThisMonth); k++) {
            this.daysInNextMonth.push(k + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                this.daysInNextMonth.push(l);
            }
        }
        return this.daysInNextMonth;
    };
    AppointmentsPage.prototype.getDaysOfMonth = function (month) {
        console.log(month);
        this.date = new Date();
        this.daysInThisMonth = new Array();
        this.currentYear = this.date.getFullYear();
        if (month === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
            this.currentMonth = new Date().getMonth();
            this.slidenum = month;
        }
        else {
            this.currentDate = 999;
        }
        //Days in last month
        var thisNumOfDays = new Date(this.date.getFullYear(), month + 1, 0).getDate();
        for (var j = 0; j < thisNumOfDays; j++) {
            this.daysInThisMonth.push(j + 1);
        }
        return this.daysInThisMonth;
    };
    AppointmentsPage.prototype.goToCurrentDate = function (m) {
        this.date = new Date();
        this.slidenum = m;
        this.getDaysOfMonth(this.date.getMonth());
    };
    AppointmentsPage.prototype.goToLastMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth(this.date.getMonth());
    };
    AppointmentsPage.prototype.goToNextMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth(this.date.getMonth());
    };
    AppointmentsPage.prototype.createAppointment = function () {
        debugger;
        /* this.firstdate=this.currentYear+this.currentMonth+this.currentDate+" 00:00:00";
          this.seconddate=this.currentYear+this.currentMonth+this.currentDate+" 23:59:59";*/
        this.navCtrl.push(CreateAppointmentPage, { StartDate: this.firstdate, EndDate: this.seconddate });
    };
    AppointmentsPage.prototype.loadEventThisMonth = function () {
        var _this = this;
        this.eventList = new Array();
        var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        this.calendar.listEventsInRange(startDate, endDate).then(function (msg) {
            msg.forEach(function (item) {
                _this.eventList.push(item);
            });
            console.log(_this.eventList);
        });
    };
    AppointmentsPage.prototype.checkEvent = function (day) {
        var hasEvent = false;
        var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
        var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
        this.eventList.forEach(function (event) {
            if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
                hasEvent = true;
            }
        });
        return hasEvent;
    };
    AppointmentsPage.prototype.selectDate = function (day, month, year) {
        var _this = this;
        this.currentDate = new Date(year + "-" + (month + 1) + "-" + day).getDate();
        this.isSelected = false;
        this.selectedEvent = new Array();
        var thisDate1 = year + "-" + (month + 1) + "-" + day + " 00:00:00";
        var thisDate2 = year + "-" + (month + 1) + "-" + day + " 23:59:59";
        this.firstdate = thisDate1;
        this.seconddate = thisDate2;
        debugger;
        this.eventList = this.allEvents.filter(function (item) {
            var date = new Date(item.start_date).toDateString();
            return (date.indexOf(new Date(_this.firstdate).toDateString()) > -1);
        });
        /* this.eventList.forEach(event => {
           if (((event.startTime >= thisDate1) && (event.startTime <= thisDate2)) || ((event.endTime >= thisDate1) && (event.endTime <= thisDate2))) {
           this.isSelected = true;
           this.selectedEvent.push(event);
         
           }
         });*/
    };
    AppointmentsPage.prototype.deleteEvent = function (evt) {
        var _this = this;
        // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
        // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure want to delete this event?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(function (msg) {
                            console.log(msg);
                            _this.loadEventThisMonth();
                            //this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AppointmentsPage.prototype.getAllEvents = function () {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.appointmentService.appointmentList(userid).then(function (result) {
            if (result.code == 1) {
                _this.allEvents = result.data;
                _this.eventList = result.data;
            }
            else {
            }
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    AppointmentsPage.prototype.getTime = function (date) {
        var time = { hour: 'numeric', minute: 'numeric' };
        var getTime = new Date(date).toLocaleString("en-US", time);
        return getTime;
    };
    AppointmentsPage.prototype.getDate = function (date) {
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var getdate = new Date(date).toLocaleString("en-US", options);
        return getdate;
    };
    AppointmentsPage.prototype.gotoEdit = function (id) {
        this.navCtrl.setRoot('EditAppointmentPage', { id: id });
    };
    AppointmentsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-appointments',
            templateUrl: 'appointments.html',
        }),
        __metadata("design:paramtypes", [AlertController, NavController, NavParams, Calendar, AppointmentProvider])
    ], AppointmentsPage);
    return AppointmentsPage;
}());
export { AppointmentsPage };
//# sourceMappingURL=appointments.js.map