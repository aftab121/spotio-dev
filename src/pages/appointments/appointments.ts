import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Slides  } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { CreateAppointmentPage } from '../../pages/create-appointment/create-appointment';

/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  @ViewChild('mySlider') slider: Slides;
  slideOpts = {
    effect: 'flip'
  };
  date: any = new Date();
  monthYears: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;
  firstdate: any = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00");
  seconddate: any = new Date(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate() + 1) + " 23:59:59");
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    /* debugger;
     var element=document.querySelector('.currentDate');
     console.log(element.className);*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentsPage');
    // this.getDaysOfMonth();
    // this.loadEventThisMonth();
  }

  onSlideChanged(e, m) {
    var month = m;
    let currentIndex = this.slider.getActiveIndex();
    console.log("You are on Slide ", (currentIndex + 1));
  }


  getDaysInLastMonth(month) {
    this.daysInLastMonth = new Array();
    var firstDayThisMonth = new Date(this.date.getFullYear(), month, 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), month, 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    return this.daysInLastMonth;
  }


  getDaysInNextMonth(month) {
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
  }
  getDaysOfMonth(month) {
    console.log(month);
    this.date = new Date().setMonth(month);
    this.daysInThisMonth = new Array();
    this.currentMonth = this.monthNames[month];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    //Days in last month

    var thisNumOfDays = new Date(this.date.getFullYear(), month + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }
    return this.daysInThisMonth;
  }
  goToCurrentDate() {
    this.date = new Date();
    this.getDaysOfMonth(this.date.getMonth());
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth(this.date.getMonth());
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth(this.date.getMonth());
  }

  createAppointment() {
    debugger;
    /* this.firstdate=this.currentYear+this.currentMonth+this.currentDate+" 00:00:00";
      this.seconddate=this.currentYear+this.currentMonth+this.currentDate+" 23:59:59";*/
    this.navCtrl.push(CreateAppointmentPage, { StartDate: this.firstdate, EndDate: this.seconddate });
  }


  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          this.eventList.push(item);
        });
        console.log(this.eventList);


      }
    );
  }

  checkEvent(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
    this.eventList.forEach(event => {
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }

  selectDate(day,month) {
    debugger;
    this.currentDate = new Date(this.date.getFullYear() + "-" + month + "-" + day).getDate();
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = this.date.getFullYear() + "-" + month + "-" + day + " 00:00:00";
    var thisDate2 = this.date.getFullYear() + "-" + (month + 1) + "-" + day + " 23:59:59";
    debugger;
    this.firstdate = new Date(thisDate1);
    this.seconddate = new Date(thisDate2);
   /* this.eventList.forEach(event => {
      if (((event.startTime >= thisDate1) && (event.startTime <= thisDate2)) || ((event.endTime >= thisDate1) && (event.endTime <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);

      }
    });*/
  }

  deleteEvent(evt) {
    // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
              (msg) => {
                console.log(msg);
                this.loadEventThisMonth();
                this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
              },
              (err) => {
                console.log(err);
              }
            )
          }
        }
      ]
    });
    alert.present();
  }

}
