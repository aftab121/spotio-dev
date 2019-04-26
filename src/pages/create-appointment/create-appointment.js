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
/**
 * Generated class for the CreateAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateAppointmentPage = /** @class */ (function () {
    function CreateAppointmentPage(alertCtrl, navCtrl, navParams, calendar, appointmentService, modalCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.appointmentService = appointmentService;
        this.modalCtrl = modalCtrl;
        this.event = { userid: "", pin_status: "", pin_name: "", location: "", pin_id: "", startDate: "", endDate: "", startTime: new Date(), endTime: new Date(), note: "", pin_status_id: "" };
        debugger;
        this.event.startDate = navParams.data['StartDate'];
        this.event.endDate = navParams.data['EndDate'];
    }
    CreateAppointmentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateAppointmentPage');
    };
    CreateAppointmentPage.prototype.getItems = function (ev) {
        var val = ev.value;
        if (val && val.trim() != '') {
            this.openModal(val);
        }
    };
    CreateAppointmentPage.prototype.openModal = function (data) {
        var _this = this;
        var myModalOptions = {
            enableBackdropDismiss: true,
            cssClass: 'custom-modal'
        };
        /* const myModalData = {
           name: 'Paul Halliday',
           occupation: 'Developer'
         };*/
        var myModal = this.modalCtrl.create('ModalPage', { data: data }, myModalOptions);
        myModal.present();
        myModal.onDidDismiss(function (item) {
            _this.event.pin_status = item.pin_status.pin_status_name;
            _this.event.pin_status_id = item.pin_status.id;
            _this.event.pin_name = item.name;
            _this.event.pin_id = item.id;
            _this.event.location = item.house_number + "," + item.house_address;
        });
        /*   myModal.onWillDismiss((data) => {
             console.log("I'm about to dismiss");
             console.log(data);
           });*/
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
        this.event.startDate = this.event.startDate + "," + this.event.startTime;
    };
    CreateAppointmentPage.prototype.endTimeChange = function (evt) {
        this.event.endDate = this.event.endDate + "," + this.event.endTime;
    };
    CreateAppointmentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-appointment',
            templateUrl: 'create-appointment.html',
        }),
        __metadata("design:paramtypes", [AlertController, NavController, NavParams, Calendar, AppointmentProvider, ModalController])
    ], CreateAppointmentPage);
    return CreateAppointmentPage;
}());
export { CreateAppointmentPage };
//# sourceMappingURL=create-appointment.js.map