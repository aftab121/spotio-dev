import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController , Platform } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import {AddpinProvider} from '../../providers/addpin/addpin';
import 'rxjs/add/operator/map';
import { GetPinProvider } from '../../providers/get-pin/get-pin';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

    @ViewChild('map') mapElement: ElementRef;
  map: any;
  addpinfrm:any={};
/*    map: GoogleMap;*/
  overlayHidden: boolean = true;
    loading:any;
      responseObj:any;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public toastCtrl: ToastController, public plt: Platform, public addpinService:AddpinProvider , public PinProvider: GetPinProvider,private geolocation: Geolocation) {
        this.plt.ready().then(() => {
      this.loadMap2();
    });
    }




    loadMap2(){

    let latLng = new google.maps.LatLng('36.114647', '-115.172813');

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
       mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
          },
      position: latLng
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    /*let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>Heading</h4>";

    this.addInfoWindow(marker, content);*/

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }



//Show UI loader of ionic
  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  
  //Hide UI loader of ionic
  hideLoader(){
    this.loading.dismiss();
  }
  public showOverlay() {
    this.overlayHidden = false;
  }
  public hideOverlay() {
    this.overlayHidden = true;
  }
  ionViewDidLoad() {
    var obj = this;
    this.PinProvider.GetPinList('1').then((result) => {
        result.data.data.forEach(function(value){ 
            console.log(value); 
             var myString = value.pin_status.color_code;
            var sillyString = myString.substr(1).slice(0);
            var iconImage = 'assets/markers/'+sillyString+'.png';
            var icon = {
                url: iconImage, // url
                scaledSize: new google.maps.Size(45, 45), // scaled size
                //origin: new google.maps.Point(0,0), // origin
                //anchor: new google.maps.Point(0, 0), // anchor
                labelOrigin: new google.maps.Point(25,32)
            };
           

            let marker = new google.maps.Marker({
              icon: icon,
              map: obj.map,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(value.latitude, value.longitude)
            });
        });
     }, (error) => {
       // console.log(JSON.stringify(error));
     });
    
  }
  AddPin(){
    //alert('cliecked add pins'); 
          var userid=localStorage.getItem('users_data');
      this.addpinService.createAddPin(userid).then((result)=>{
        if(result.resCode==1){        
          this.addpinfrm=result.data;
             this.overlayHidden = true;
             this.navCtrl.push('AddpinPage',result.data);
        }
      },(error)=>{
        console.log('error',JSON.stringify(error));
      }) 
  }
  goToFilter(){
    this.navCtrl.push('FilterPage')
  }
  goToList(){
    this.navCtrl.setRoot(ListPage)
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 36.114647,
          lng: -115.172813
        },
        zoom: 5/*,
        tilt: 30*/
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {alert('Map is ready!')});

  }
    onNavingateClick(){
    this.getGeolocation();
  }

    public getGeolocation(){
    
  }

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.map.addMarkerSync({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.showToast('clicked!');
          });
        });
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

}
