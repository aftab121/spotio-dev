import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,Modal, ModalOptions } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import {AppointmentProvider}from '../../providers/appointment/appointment';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
/**
 * Generated class for the CreateAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-appointment',
  templateUrl: 'create-appointment.html',
})
export class CreateAppointmentPage {
  items = [];
  list:any=[];
  event = { userid: "", pin_status: "", pin_name: "", location: "", pin_id: "", startDate: "", endDate: "", startTime: "", endTime: "", note: "", pin_status_id: "" };
  show:boolean=false;
  visible_input:boolean=true;
   visible_input1:boolean=false;
  myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true,
    cssClass: 'custom-modal'
  };
  myModal: Modal = this.modalCtrl.create('ModalPage', {  dismissOnPageChange: true }, this.myModalOptions);
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, public appointmentService: AppointmentProvider, public pinlistService: PinlistProvider, public modalCtrl: ModalController) {
    debugger;
    if (navParams.data['data'] != undefined || navParams.data['data'] != null) {
      this.visible_input = false;
      this.visible_input1 = true;
      this.event.userid = navParams.data['data'].user.id;
      this.event.pin_status = navParams.data['data'].pin_status.pin_status_name;
      this.event.pin_status_id = navParams.data['data'].pin_status.id;
      this.event.pin_id = navParams.data['data'].id;
      this.event.location = navParams.data['data'].house_number + "," + navParams.data['data'].house_address
      var dt=new Date();
      this.event.startDate = dt.toISOString();
      this.event.endDate = new Date(dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate()+" "+(dt.getHours()+1)+":"+dt.getSeconds()).toISOString();
    }
    else{
       this.getPinLIst();
    this.event.startDate = new Date(navParams.data['StartDate']).toISOString();
    this.event.endDate = new Date(navParams.data['EndDate']).toISOString();
    }
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentPage');
  }
  getPinLIst() {
    var userid = localStorage.getItem("users_data");
    this.pinlistService.getPinList(userid).then((result) => {
      if (result.code == 1) {
        this.items = result.data;
      }
    }, (error) => {
      console.log("Error", JSON.stringify(error));
    });
  }
  getItems(ev) {
    var modalPage;

    this.getPinLIst();
    var val = ev.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      });
      if (this.items.length > 0) {
        this.show=true;
      }
    }
    else {
       this.show=false;      
    }
  }
  hideList()
  {
     this.show=false;   
  }
  closeModal(item) {
    this.event.pin_status = item.pin_status.pin_status_name;
    this.event.pin_status_id = item.pin_status.id;
    this.event.pin_name = item.name;
    this.event.pin_id = item.id;
    this.event.location = item.house_number + "," + item.house_address
    this.show = false;
  }
 /* openModal(data) {
    this.myModal["data"].data = data;
    this.myModal.dismiss();
    this.myModal.present();

    this.myModal.onDidDismiss((item) => {
      
    });   
  }*/
  ionBlur() {
    this.myModal.dismiss();
  }
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
  save() {
    debugger;
    this.event.userid = localStorage.getItem('users_data');   
    var json = JSON.stringify(this.event);
    this.appointmentService.createAppointment(this.event).then((result) => {
      if (result.code == 1) {
        console.log("success");
        //this.navCtrl.setRoot(MapPage);          
      }
      else if (result.code == 2) {
        /*this.message=result.msg;
         this.presentAlert(this.message);*/
        console.log("error");
      }
    }, (error) => {
      console.log('error', JSON.stringify(error));
    });
  }
  startDateChange(datePicker) {
    datePicker.open();
  }
  endDateChange(datePicker1) {
    datePicker1.open();
  }
  startTimeChange(evt) {
    var startdate = new Date(this.event.startDate);
    var startdt = startdate.getFullYear() + "-" + (startdate.getMonth() + 1) + "-" + startdate.getDate() + " " + this.event.startTime;
    this.event.startDate = new Date(startdt).toISOString();
  }
  endTimeChange(evt) {
    var enddate = new Date(this.event.startDate);
    var enddt = enddate.getFullYear() + "-" + (enddate.getMonth()+1) + "-" + enddate.getDate() + " " + this.event.endTime;
    this.event.endDate = new Date(enddt).toISOString();
  }
}
