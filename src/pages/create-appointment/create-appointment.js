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
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
/**
 * Generated class for the CreateAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateAppointmentPage = /** @class */ (function () {
    function CreateAppointmentPage(alertCtrl, navCtrl, navParams, calendar, appointmentService, pinlistService, modalCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.appointmentService = appointmentService;
        this.pinlistService = pinlistService;
        this.modalCtrl = modalCtrl;
        this.items = [];
        this.list = [];
        this.event = { userid: "", pin_status: "", pin_name: "", location: "", pin_id: "", startDate: "", endDate: "", startTime: "", endTime: "", note: "", pin_status_id: "" };
        this.show = false;
        this.visible_input = true;
        this.visible_input1 = false;
        this.myModalOptions = {
            showBackdrop: true,
            enableBackdropDismiss: true,
            cssClass: 'custom-modal'
        };
        this.myModal = this.modalCtrl.create('ModalPage', { dismissOnPageChange: true }, this.myModalOptions);
        debugger;
        if (navParams.data['data'] != undefined || navParams.data['data'] != null) {
            this.visible_input = false;
            this.visible_input1 = true;
            this.event.userid = navParams.data['data'].user.id;
            this.event.pin_status = navParams.data['data'].pin_status.pin_status_name;
            this.event.pin_status_id = navParams.data['data'].pin_status.id;
            this.event.pin_id = navParams.data['data'].id;
            this.event.location = navParams.data['data'].house_number + "," + navParams.data['data'].house_address;
            var dt = new Date();
            this.event.startDate = dt.toISOString();
            this.event.endDate = new Date(dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + (dt.getHours() + 1) + ":" + dt.getSeconds()).toISOString();
        }
        else {
            this.getPinLIst();
            this.event.startDate = new Date(navParams.data['StartDate']).toISOString();
            this.event.endDate = new Date(navParams.data['EndDate']).toISOString();
        }
    }
    CreateAppointmentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateAppointmentPage');
    };
    CreateAppointmentPage.prototype.getPinLIst = function () {
        var _this = this;
        var userid = localStorage.getItem("users_data");
        this.pinlistService.getPinList(userid).then(function (result) {
            if (result.code == 1) {
                _this.items = result.data;
            }
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    CreateAppointmentPage.prototype.getItems = function (ev) {
        var modalPage;
        this.getPinLIst();
        var val = ev.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
            if (this.items.length > 0) {
                this.show = true;
            }
        }
        else {
            this.show = false;
        }
    };
    CreateAppointmentPage.prototype.hideList = function () {
        this.show = false;
    };
    CreateAppointmentPage.prototype.closeModal = function (item) {
        this.event.pin_status = item.pin_status.pin_status_name;
        this.event.pin_status_id = item.pin_status.id;
        this.event.pin_name = item.name;
        this.event.pin_id = item.id;
        this.event.location = item.house_number + "," + item.house_address;
        this.show = false;
    };
    /* openModal(data) {
       this.myModal["data"].data = data;
       this.myModal.dismiss();
       this.myModal.present();
   
       this.myModal.onDidDismiss((item) => {
         
       });
     }*/
    CreateAppointmentPage.prototype.ionBlur = function () {
        this.myModal.dismiss();
    };
    /*  save() {
      this.calendar.createEvent(this.event.pin_name, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Event saved successfully',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
      },
      (err) => {
      let alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
      }
      );
      }*/
    CreateAppointmentPage.prototype.save = function () {
        debugger;
        this.event.userid = localStorage.getItem('users_data');
        var json = JSON.stringify(this.event);
        this.appointmentService.createAppointment(this.event).then(function (result) {
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
    CreateAppointmentPage.prototype.startDateChange = function (datePicker) {
        datePicker.open();
    };
    CreateAppointmentPage.prototype.endDateChange = function (datePicker1) {
        datePicker1.open();
    };
    CreateAppointmentPage.prototype.startTimeChange = function (evt) {
        var startdate = new Date(this.event.startDate);
        var startdt = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " " + this.event.startTime;
        this.event.startDate = new Date(startdt).toISOString();
    };
    CreateAppointmentPage.prototype.endTimeChange = function (evt) {
        var enddate = new Date(this.event.startDate);
        var enddt = enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate() + " " + this.event.endTime;
        this.event.endDate = new Date(enddt).toISOString();
    };
    CreateAppointmentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-appointment',
            templateUrl: 'create-appointment.html',
        }),
        __metadata("design:paramtypes", [AlertController, NavController, NavParams, Calendar, AppointmentProvider, PinlistProvider, ModalController])
    ], CreateAppointmentPage);
    return CreateAppointmentPage;
}());
export { CreateAppointmentPage };
//# sourceMappingURL=create-appointment.js.map