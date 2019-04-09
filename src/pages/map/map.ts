import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  , Platform } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import {AddpinProvider} from '../../providers/addpin/addpin';
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

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  addpinfrm:any={};
	map: GoogleMap;
  overlayHidden: boolean = true;
	constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public plt: Platform, public addpinService:AddpinProvider) {
	}

  public showOverlay() {
    this.overlayHidden = false;
  }
  public hideOverlay() {
    this.overlayHidden = true;
  }
  ionViewDidLoad() {
    var obj = this;
    this.plt.ready().then((readySource) => {
      obj.loadMap();
    })
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
