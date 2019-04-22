import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePickerDirective } from 'ion-datepicker';
import { MapPage } from '../../pages/map/map';
import {AddpinProvider} from '../../providers/addpin/addpin';

@Component({
  selector: 'page-pindetails',
  templateUrl: 'pindetails.html'
})
export class PinDetailsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{id:string,title: string, date: string, time: string, address1:string, address2:string, city:string, state:string, pin_status: any[], user:any[]}>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public addpinService: AddpinProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    if(navParams.data["data"]!=undefined){
        this.items["id"]=navParams.data["data"]['id'];
        this.items["title"]=navParams.data["data"]['title'];
        this.items["date"]=navParams.data["data"]['date'];
        this.items["time"]=navParams.data["data"]['time'];
        this.items["address1"]=navParams.data["data"]['address1'];
        this.items["address2"]=navParams.data["data"]['address2'];
        this.items["city"]=navParams.data["data"]['city'];
        this.items["state"]=navParams.data["data"]['state'];
        this.items["pin_status"]=navParams.data["data"]['pin_status'];
        this.items["user"]=navParams.data["data"]['user'];
    }
    this.selectedItem = navParams.get('item');
   
  }
  back(){
   this.navCtrl.setRoot(MapPage)
  }
    editPin(id) {    
    var userid = localStorage.getItem('users_data');
    this.addpinService.EditPin(userid, id).then((result) => {
      if (result.resCode == 1) {
        this.navCtrl.push('EditpinPage', result.data);
      }
    }, (error) => {
      console.log('error', JSON.stringify(error));
    });

  }
}
