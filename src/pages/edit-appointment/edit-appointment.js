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
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
import { Calendar } from '@ionic-native/calendar';
/**
 * Generated class for the EditAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditAppointmentPage = /** @class */ (function () {
    function EditAppointmentPage(navCtrl, navParams, alertCtrl, calendar, appointmentService, pinlistService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.calendar = calendar;
        this.appointmentService = appointmentService;
        this.pinlistService = pinlistService;
        this.eventlist = {
            id: "",
            userid: "",
            pin_id: "",
            pin_name: "",
            pin_status: "",
            location: "",
            start_date: "",
            end_date: "",
            notes: "",
            created_at: "",
            updated_at: "",
            pin_info: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: ""
        };
        var id = navParams.data['id'];
        this.editAppointment(id);
    }
    EditAppointmentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditAppointmentPage');
    };
    EditAppointmentPage.prototype.editAppointment = function (id) {
        var _this = this;
        debugger;
        var userid = localStorage.getItem('users_data');
        this.appointmentService.editAppointment(id, userid).then(function (result) {
            if (result.code == 1) {
                _this.eventlist = result.data;
                _this.eventlist.startDate = new Date(result.data.start_date).toDateString();
                _this.eventlist.endDate = new Date(result.data.end_date).toDateString();
                _this.eventlist.startTime = new Date(result.data.start_date).toTimeString();
                _this.eventlist.endTime = new Date(result.data.end_date).toTimeString();
            }
            else {
            }
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    EditAppointmentPage.prototype.startDateChange = function (datePicker) {
        datePicker.open();
    };
    EditAppointmentPage.prototype.endDateChange = function (datePicker1) {
        datePicker1.open();
    };
    EditAppointmentPage.prototype.startTimeChange = function (evt) {
        var startdate = new Date(this.eventlist.startDate);
        var startdt = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " " + this.eventlist.startTime;
        this.eventlist.startDate = new Date(startdt).toISOString();
    };
    EditAppointmentPage.prototype.endTimeChange = function (evt) {
        var enddate = new Date(this.eventlist.startDate);
        var enddt = enddate.getDate() + "-" + enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + " " + this.eventlist.endTime;
        this.eventlist.endDate = new Date(enddt).toISOString();
    };
    EditAppointmentPage.prototype.update = function () {
        var json = JSON.stringify(this.eventlist);
        this.appointmentService.createAppointment(this.eventlist).then(function (result) {
            if (result.code == 1) {
                console.log("success");
                //this.navCtrl.setRoot(MapPage);          
            }
            else if (result.code == 2) {
                /*this.message=result.msg;
                 this.presentAlert(this.message);*/
                console.log("error");
            }
        }, function (error) {
            console.log('error', JSON.stringify(error));
        });
    };
    EditAppointmentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-appointment',
            templateUrl: 'edit-appointment.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController, Calendar, AppointmentProvider, PinlistProvider])
    ], EditAppointmentPage);
    return EditAppointmentPage;
}());
export { EditAppointmentPage };
//# sourceMappingURL=edit-appointment.js.map