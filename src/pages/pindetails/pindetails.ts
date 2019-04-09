import { Component } from '@angular/core';
import {IonicPage NavController, NavParams } from 'ionic-angular';
import { DatePickerDirective } from 'ion-datepicker';
import { MapPage } from '../../pages/map/map';


@Component({
  selector: 'page-pindetails',
  templateUrl: 'pindetails.html'
})
export class PinDetailsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, date: string, time: string, address1:string, address2:string, city:string, state:string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
   
  }
  back(){
   this.navCtrl.setRoot(MapPage)
  }
}
