import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,Modal, ModalOptions } from 'ionic-angular';
import {AppointmentProvider}from '../../providers/appointment/appointment';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
import { Calendar } from '@ionic-native/calendar';
import {MapPage} from '../../pages/map/map';

/**
 * Generated class for the EditAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-appointment',
	templateUrl: 'edit-appointment.html',
})
export class EditAppointmentPage {
	eventlist ={
		id:"",
		userid: "",
		pin_id: "",
		pin_name: "",
		pin_status: "",
		location: "",	
		notes: "",
	    start_date:"",
	    startTime:"",
		end_date:"",
		endTime:""
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private calendar: Calendar, public appointmentService: AppointmentProvider, public pinlistService: PinlistProvider) {
        var id=navParams.data['id'];
		this.editAppointment(id);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditAppointmentPage');
	}
	editAppointment(id) {
		debugger;
		var userid = localStorage.getItem('users_data');
		this.appointmentService.editAppointment(id, userid).then((result) => {
			if (result.code == 1) {
				this.eventlist = result.data;
				this.eventlist.start_date=result.data.start_date;
				this.eventlist.end_date=result.data.end_date;
			    this.eventlist.startTime=new Date(result.data.start_date).toTimeString();
				this.eventlist.endTime=new Date(result.data.end_date).toTimeString();
			}
			else {

			}

		}, (error) => {
			console.log("Error", JSON.stringify(error));
		});
	}
	 startDateChange(datePicker) {
    datePicker.open();
  }
  endDateChange(datePicker1) {
    datePicker1.open();
  }
  startTimeChange(evt) {
    var startdate = new Date(this.eventlist.start_date);
    var startdt = startdate.getFullYear() + "-" + (startdate.getMonth()+1)  + "-" + startdate.getDate() + " " + this.eventlist.startTime;
    this.eventlist.start_date = new Date(startdt).toISOString();
  }
  endTimeChange(evt) {
    var enddate = new Date(this.eventlist.end_date);
    var enddt = enddate.getFullYear() + "-" + (enddate.getMonth()+1) + "-" + enddate.getDate()+  " " + this.eventlist.endTime;
    this.eventlist.end_date = new Date(enddt).toISOString();
  }
  update(){  
    var json = JSON.stringify(this.eventlist);    
    this.appointmentService.UpdateAppointment(json).then((result) => {
      if (result.code == 1) {
        //console.log("success");
        this.navCtrl.setRoot(MapPage);          
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

 back(){
   this.navCtrl.setRoot(MapPage)
  }
}
