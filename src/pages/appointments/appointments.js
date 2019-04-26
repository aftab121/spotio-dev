var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CreateAppointmentPage } from '../../pages/create-appointment/create-appointment';
/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(alertCtrl, navCtrl, navParams, calendar) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.slideOpts = {
            effect: 'flip'
        };
        this.date = new Date();
        this.firstdate = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00");
        this.seconddate = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate() + 1) + " 23:59:59");
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        /* debugger;
         var element=document.querySelector('.currentDate');
         console.log(element.className);*/
    }
    AppointmentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AppointmentsPage');
        // this.getDaysOfMonth();
        // this.loadEventThisMonth();
    };
    AppointmentsPage.prototype.onSlideChanged = function (e, m) {
        var month = m;
        var currentIndex = this.slider.getActiveIndex();
        console.log("You are on Slide ", (currentIndex + 1));
    };
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
        this.currentMonth = this.monthNames[month];
        this.currentYear = this.date.getFullYear();
        if (month === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
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
    AppointmentsPage.prototype.goToCurrentDate = function () {
        this.date = new Date();
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
    AppointmentsPage.prototype.selectDate = function (day, month) {
        this.currentDate = new Date(this.date.getFullYear() + "-" + (month + 1) + "-" + day).getDate();
        this.isSelected = false;
        this.selectedEvent = new Array();
        var thisDate1 = this.date.getFullYear() + "-" + (month + 1) + "-" + day + " 00:00:00";
        var thisDate2 = this.date.getFullYear() + "-" + (month + 1) + "-" + day + " 23:59:59";
        debugger;
        this.firstdate = thisDate1;
        this.seconddate = thisDate2;
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
    __decorate([
        ViewChild('mySlider'),
        __metadata("design:type", Slides)
    ], AppointmentsPage.prototype, "slider", void 0);
    AppointmentsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-appointments',
            templateUrl: 'appointments.html',
        }),
        __metadata("design:paramtypes", [AlertController, NavController, NavParams, Calendar])
    ], AppointmentsPage);
    return AppointmentsPage;
}());
export { AppointmentsPage };
//# sourceMappingURL=appointments.js.map