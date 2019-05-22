import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';
import { PinDetailsPage } from '../../pages/pindetails/pindetails';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
import { AddpinProvider } from '../../providers/addpin/addpin';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  addpinfrm: any = {};
  overlayHidden: boolean = true;
  selectedItem: any;
  icons: string[];
  items: Array<{ id: string, title: string, date: string, time: string, address1: string, address2: string, city: string, state: string, pin_status: any[], user: any[], pindata: any[] }> = [];
  //items: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pinlistService: PinlistProvider, public addpinService: AddpinProvider, public loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');    
    // Let's populate this page with some filler content for funzies
    this.icons = ['pin', 'pin', 'pin'];
    this.getPinLIst();
    /*  for (let i = 1; i < 3; i++) {
      this.items.push({
        title: 'Item ' + i,
        address1: 'Kursi Raod',
        address2: 'Kursi Road',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        date: 'Mar 26,2019',
        time: '3:24 PM',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      }*/
  }
 /* goToFilter() {
    this.navCtrl.setRoot('FilterPage')
  }
  public showOverlay() {
    this.overlayHidden = false;
  }
  public hideOverlay() {
    this.overlayHidden = true;
  }
  AddPin() {
    var userid = localStorage.getItem('users_data');
    this.addpinService.createAddPin(userid).then((result) => {
      if (result.resCode == 1) {
        this.addpinfrm = result.data;
        this.overlayHidden = true;
        this.navCtrl.setRoot('AddpinPage', result.data);
      }
    }, (error) => {
      console.log('error', JSON.stringify(error));
    })
  }*/
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    /* this.navCtrl.push(PinDetailsPage, {
       item: item
     });*/
    this.navCtrl.push(PinDetailsPage, { data: item.pindata });
  }
  goToMap() {
    this.navCtrl.setRoot(MapPage)
  }
  getPinLIst() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Please wait...',
      duration: 5000
    });
    loading.present();
    var userid = localStorage.getItem("users_data");
    this.pinlistService.getPinList(userid).then((result) => {
      if (result.code == 1) {
        result.data.forEach(function(value) {
          var options = { year: 'numeric', month: 'short', day: 'numeric' };
          var time = { hour: 'numeric', minute: 'numeric' };
          var dateTime = new Date(value.created_at);
          console.log("Original Date",JSON.stringify(value.created_at));
          console.log("Parse Date",JSON.stringify(dateTime));
          console.log("Parsed Formated Date",JSON.stringify(dateTime.toDateString().substr(4,15)));
          this.items.push({
            id: value.id,
            title: value.name,
            address1: value.house_number,
            address2: value.house_address,
            city: value.city,
            state: value.state,
            date: dateTime.toDateString().substr(4,15),
            time: dateTime.toTimeString().substr(0,5),
            pin_status: value.pin_status,
            user: value.user,
            pindata: value
            //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
          loading.dismiss();
        }, this);
      }
    }, (error) => {
      console.log("Error", JSON.stringify(error));
    });
  }
    filterPin() {
  
    var userid = localStorage.getItem("users_data");
    this.pinlistService.getPinList(userid).then((result) => {
      if (result.code == 1) {
        result.data.forEach(function(value) {
          var options = { year: 'numeric', month: 'short', day: 'numeric' };
          var time = { hour: 'numeric', minute: 'numeric' };
          var dateTime = new Date(value.created_at);
          console.log("Original Date",JSON.stringify(value.created_at));
          console.log("Parse Date",JSON.stringify(dateTime));
          console.log("Parsed Formated Date",JSON.stringify(dateTime.toDateString().substr(4,15)));
          this.items.push({
            id: value.id,
            title: value.name,
            address1: value.house_number,
            address2: value.house_address,
            city: value.city,
            state: value.state,
            date: dateTime.toDateString().substr(4,15),
            time: dateTime.toTimeString().substr(0,5),
            pin_status: value.pin_status,
            user: value.user,
            pindata: value
            //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
          
        }, this);
      }
    }, (error) => {
      console.log("Error", JSON.stringify(error));
    });
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.filterPin();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
