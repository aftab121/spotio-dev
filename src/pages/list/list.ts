import { Component } from '@angular/core';
import {IonicPage NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';
import { PinDetailsPage } from '../../pages/pindetails/pindetails';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, date: string, time: string, address1:string, address2:string, city:string, state:string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['pin', 'pin', 'pin'];

    this.items = [];
    for (let i = 1; i < 3; i++) {
      this.items.push({
        title: 'Item ' + i,
        address1:'Kursi Raod',
        address2:'Kursi Road',        
        city:'Lucknow',
        state:'Uttar Pradesh',
        date:'Mar 26,2019',
        time:'3:24 PM',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PinDetailsPage, {
      item: item
    });
  }
  goToMap(){
    this.navCtrl.setRoot(MapPage)
  } 
}
