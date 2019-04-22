import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

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
  myDate;
  myTime;
event = { pin_name: "",name:"", location: "", message: "", startDate: "", endDate: "", startTime:"", endTime:"" };
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAppointmentPage');
  }

  save() {
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
}
change(datePicker){
  console.log("date",this.myDate);
  console.log("datePicker",datePicker);
 
  datePicker.open();
}
}
