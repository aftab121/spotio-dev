import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePickerDirective } from 'ion-datepicker';
import { MapPage } from '../../pages/map/map';
import {AddpinProvider} from '../../providers/addpin/addpin';
import {CreateAppointmentPage} from '../../pages/create-appointment/create-appointment';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NavigationMapPage } from '../../pages/navigation-map/navigation-map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google;
@Component({
  selector: 'page-pindetails',
  templateUrl: 'pindetails.html'
})
export class PinDetailsPage {
  selectedItem: any;
  icons: string[];
  updated_date:any;
  updated_time:any;
  latitude:number ;
    longitude:number ;
  items:any /*Array<{id:string,title: string, date: string, time: string, address1:string, address2:string, city:string, state:string, pin_status: any[], user:any[]}>*/=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public addpinService: AddpinProvider, public geolocation:Geolocation,private launchNavigator:LaunchNavigator) {
    // If we navigated to this page, we will have an item available as a nav param
    if (navParams.data["data"] != undefined) {
      this.items = navParams.data["data"];
      var options = { year: 'numeric', month: 'short', day: 'numeric' };
      var time={hour: 'numeric', minute: 'numeric' };
      var date = new Date(this.items.updated_at);
      this.updated_date = date.toLocaleDateString("en-US", options);
      this.updated_time = date.toLocaleTimeString("en-US", time);

      /*this.items["id"]=navParams.data["data"]['id'];
      this.items["title"]=navParams.data["data"]['title'];
      this.items["date"]=navParams.data["data"]['date'];
      this.items["time"]=navParams.data["data"]['time'];
      this.items["address1"]=navParams.data["data"]['address1'];
      this.items["address2"]=navParams.data["data"]['address2'];
      this.items["city"]=navParams.data["data"]['city'];
      this.items["state"]=navParams.data["data"]['state'];
      this.items["pin_status"]=navParams.data["data"]['pin_status'];
      this.items["user"]=navParams.data["data"]['user'];*/
    }
    this.selectedItem = navParams.get('item');

  }
  ionViewDidLoad(){
  this.geolocation.getCurrentPosition().then(position =>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    },error=>{
        console.log('error',error);
    });
}
  getNavigation(ltd,lng){
    let options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.GOOGLE_MAPS,
             start:[this.latitude,this.longitude]
      };
      var destination=[ltd,lng];
  this.launchNavigator.navigate(destination,options).then(success =>{
    console.log(success);
  },error=>{
    console.log(error);
  })
    //var endorgin= new google.maps.LatLng(lat , lng);
    //this.navCtrl.setRoot('NavigationMapPage',{pinid:id});
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
  gotoAppointment(data){
    this.navCtrl.push(CreateAppointmentPage, {data:data});
  }
}
