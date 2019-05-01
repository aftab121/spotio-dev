import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController , Platform } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import {AddpinProvider} from '../../providers/addpin/addpin';
import 'rxjs/add/operator/map';
import { GetPinProvider } from '../../providers/get-pin/get-pin';
import { GetTerritoryProvider } from '../../providers/get-territory/get-territory';
import { Geolocation } from '@ionic-native/geolocation';
import {EditpinPage} from '../../pages/editpin/editpin';
import { PinDetailsPage } from '../../pages/pindetails/pindetails';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

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
  selector: 'page-navigation-map',
  templateUrl: 'navigation-map.html',
})
export class NavigationMapPage {

  @ViewChild('map12') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  addpinfrm: any = {};
  /*    map: GoogleMap;*/
  overlayHidden: boolean = true;
  loading: any;
  responseObj: any;
  totalPins: number = 0;
  PinsCount: any;
  id: number = 0;
  Status: string = "";
  OwnerName: string = "";
  address: string = "";
  pincode: string = "";
  city: string = "";
  state: string = "";
  updateTime: string = "";
  data_filter:any=[];
   userid: string="";
   assigned_to: string="";
   pin_status: string="";
   start_date: string="";
   end_date: string="";
   custom_date: string="";
  status_filter:any=[];
  user_filter:any=[];
  id2:string="";
  showDiv:boolean=false;
  pin_list:any=[];
  latLng:any;
  current_pinid:any = 0;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public toastCtrl: ToastController, public plt: Platform, public addpinService: AddpinProvider, public PinProvider: GetPinProvider, private geolocation: Geolocation, public TerritoryProvider: GetTerritoryProvider,  public pinlistService: PinlistProvider) {
    if(navParams.data['filter']!=undefined){
       //this.data_filter.push(navParams.data['filter']);//      
       this.assigned_to=navParams.data['filter']['assigned_to']!=undefined?navParams.data['filter']['assigned_to']:'';
       this.pin_status=navParams.data['filter']['status']!=undefined?navParams.data['filter']['status']:'';
       this.start_date=navParams.data['filter']['start_date']!=undefined?navParams.data['filter']['start_date']:'';
       this.end_date=navParams.data['filter']['end_date']!=undefined?navParams.data['filter']['end_date']:'';
       this.custom_date=navParams.data['filter']['custom_date']!=undefined?navParams.data['filter']['custom_date']:'';
    }   
    if(navParams.data['pinid']!=undefined){
    	this.current_pinid=navParams.data['pinid'];
    }
    this.plt.ready().then(() => {
      this.loadMap2();
    });
    this.PinProvider.GetPinCount('1').then((result) => {
      console.log(JSON.stringify(result))
      this.PinsCount = result.data;
    }, (error) => {

    });

  }




  loadMap2() {

    let latLng = new google.maps.LatLng('36.114647', '-115.172813');

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      fullscreenControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      position: latLng
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);      
    });

  }



  //Show UI loader of ionic
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  //Hide UI loader of ionic
  hideLoader() {
    this.loading.dismiss();
  }
  public showOverlay() {
    this.overlayHidden = false;
  }
  public hideOverlay() {
    this.overlayHidden = true;
  }
  ionViewDidLoad() {
    debugger;
   


    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Please wait...',
      duration: 5000
    });
    loading.present();
    var obj = this;
    this.userid = localStorage.getItem('users_data');
    this.addpinService.EditPin(this.userid, this.current_pinid).then((result) => {
      debugger;      
      let result_data: any = [];
      let arr: any = this.data_filter[0];
      this.pin_list = result.data.pinInfo;
      obj.totalPins = 1;
       var myString = result.data.pinStatus.filter((item)=>{
       		return item.id==parseInt(result.data.pinInfo.current_status);
       })
        var sillyString = myString[0].color_code.substr(1).slice(0);
        var iconImage = 'assets/markers/' + sillyString + '.png';
        var icon = {
          url: iconImage, // url
          scaledSize: new google.maps.Size(30, 48), // scaled size
          labelOrigin: new google.maps.Point(25, 32)
        };


       let marker = new google.maps.Marker({
          icon: icon,
          map: obj.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(result.data.pinInfo.latitude, result.data.pinInfo.longitude),
          pinData: result.data.pinInfo,
          pinStatus:myString[0]
        });

        /*this.map = new google.maps.Map(mapElemnt.nativeElement, marker);*/
        /*  let infoWindow = new google.maps.InfoWindow({
        content: value.name + " " + value.state
        });*/

        google.maps.event.addListener(marker, 'click', () => {
          var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          var timeoption = { hh: 'numeric', mm: 'numeric' }
          var date = (marker.pinData.updated_at != null ? new Date(marker.pinData.updated_at) : new Date(marker.pinData.created_at));
          this.id = marker.pinData.id;
          this.Status = marker.pinStatus.pin_status_name;
          this.OwnerName = marker.pinData.name;
          this.address = marker.pinData.house_number + ' ' + marker.pinData.house_address;
          this.pincode = marker.pinData.zipcode;
          this.city = marker.pinData.city;
          this.state = marker.pinData.state;
          this.updateTime = date.toLocaleString("en-US", options);
          if (marker != undefined) {
            this.showDiv = true;
          }
          else {
            this.showDiv = false;
          }
          var endpoint=new google.maps.LatLng(marker.position.lat() , marker.position.lng());
          this.startNavigating(endpoint);
          /*  var info=infoWindow.get(marker.map,marker);
          infoWindow.open(marker.map, marker);*/
        });
     
    }, (error) => {
      console.log(JSON.stringify(error));
    });
      let locationObj: any;
     //let latLng:any;
     this.geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(position => {
      locationObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        timestamp: position.timestamp,
        accuracy: position.coords.accuracy
      };
       this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        icon:'blue',
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      let geocoder = new google.maps.Geocoder;
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   /*   geocoder.geocode({'location': this.latLng}, (results, status) => {
   console.log(results); // read data from here
   alert(JSON.stringify(results[0]));
   console.log(status);
});*/

    }, (error) => {
      console.log("error", JSON.stringify(error));
    });
    this.TerritoryProvider.GetTerritoryList('1').then((result) => {
      result.data.forEach(function(value) {
        var triangleCoords = new Array();
        var data1 = value;
        var cord = JSON.parse(data1.cords);
        var trrname = data1.territory_name;
        var id = data1.id;

        for (let j = 0; j < cord.length; j++) {
          var lt = parseFloat(cord[j]['lat']);
          var ln = parseFloat(cord[j]['lng']);
          var tmp = { lat: lt, lng: ln };
          triangleCoords.push(tmp);

        }

        google.maps.Polygon.prototype.getBoundingBox = function() {
          var bounds = new google.maps.LatLngBounds();
          this.getPath().forEach(function(triangleCoords, index) {
            bounds.extend(triangleCoords)
          });
          return (bounds);
        };
        // Construct the polygon.
        let bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: data1.color_code,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: data1.color_code,
          fillOpacity: 0.35,
          content: trrname
        });
        bermudaTriangle.setMap(obj.map);

        new google.maps.Marker({
          position: bermudaTriangle.getBoundingBox().getCenter(),
          map: obj.map,
          label: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '24px',
            text: trrname,
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0
          }
        });

      });
    }, (error) => {

    });


  }
  startNavigating(endpoint){
   
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        //directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: this.latLng,
            destination: endpoint,
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });

    }
  AddPin() {
    var userid = localStorage.getItem('users_data');
    this.addpinService.createAddPin(userid).then((result) => {
      if (result.resCode == 1) {
        this.addpinfrm = result.data;
        this.overlayHidden = true;
        this.navCtrl.push('AddpinPage', result.data);
      }
    }, (error) => {
      console.log('error', JSON.stringify(error));
    })
  }
  goToFilter() {
    this.navCtrl.push('FilterPage')
  }
  goToList() {
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

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => { alert('Map is ready!') });

  }
  onNavingateClick() {
    this.getGeolocation();
  }

  public getGeolocation() {

  }

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

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
  gotoDetails(pin_id) {
    var userid = localStorage.getItem("users_data");
   var data = this.pin_list.filter((item) => {
          return item.id==pin_id;
        });
        this.navCtrl.push(PinDetailsPage, { data: data[0] });
  } 

}
