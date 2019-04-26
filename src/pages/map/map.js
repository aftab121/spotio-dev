var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import { AddpinProvider } from '../../providers/addpin/addpin';
import 'rxjs/add/operator/map';
import { GetPinProvider } from '../../providers/get-pin/get-pin';
import { GetTerritoryProvider } from '../../providers/get-territory/get-territory';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMapsEvent, GoogleMapsAnimation } from '@ionic-native/google-maps';
var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, loadingCtrl, navParams, toastCtrl, plt, addpinService, PinProvider, geolocation, TerritoryProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.plt = plt;
        this.addpinService = addpinService;
        this.PinProvider = PinProvider;
        this.geolocation = geolocation;
        this.TerritoryProvider = TerritoryProvider;
        this.addpinfrm = {};
        /*    map: GoogleMap;*/
        this.overlayHidden = true;
        this.totalPins = 0;
        this.id = 0;
        this.Status = "";
        this.OwnerName = "";
        this.address = "";
        this.pincode = "";
        this.city = "";
        this.state = "";
        this.updateTime = "";
        this.data_filter = [];
        this.userid = "";
        this.assigned_to = "";
        this.pin_status = "";
        this.start_date = "";
        this.end_date = "";
        this.custom_date = "";
        this.status_filter = [];
        this.user_filter = [];
        this.id2 = "";
        if (navParams.data['filter'] != undefined) {
            //this.data_filter.push(navParams.data['filter']);//      
            this.assigned_to = navParams.data['filter']['assigned_to'] != undefined ? navParams.data['filter']['assigned_to'] : '';
            this.pin_status = navParams.data['filter']['status'] != undefined ? navParams.data['filter']['status'] : '';
            this.start_date = navParams.data['filter']['start_date'] != undefined ? navParams.data['filter']['start_date'] : '';
            this.end_date = navParams.data['filter']['end_date'] != undefined ? navParams.data['filter']['end_date'] : '';
            this.custom_date = navParams.data['filter']['custom_date'] != undefined ? navParams.data['filter']['custom_date'] : '';
        }
        this.plt.ready().then(function () {
            _this.loadMap2();
        });
        this.PinProvider.GetPinCount('1').then(function (result) {
            console.log(JSON.stringify(result));
            _this.PinsCount = result.data;
        }, function (error) {
        });
    }
    MapPage.prototype.loadMap2 = function () {
        var latLng = new google.maps.LatLng('36.114647', '-115.172813');
        var mapOptions = {
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
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    };
    MapPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    //Show UI loader of ionic
    MapPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    //Hide UI loader of ionic
    MapPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    MapPage.prototype.showOverlay = function () {
        this.overlayHidden = false;
    };
    MapPage.prototype.hideOverlay = function () {
        this.overlayHidden = true;
    };
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Please wait...',
            duration: 5000
        });
        loading.present();
        var obj = this;
        this.userid = localStorage.getItem('users_data');
        this.PinProvider.GetPinList(this.userid, '1', this.pin_status, this.assigned_to, this.start_date, this.custom_date, this.end_date).then(function (result) {
            //debugger;      
            var result_data = [];
            var arr = _this.data_filter[0];
            obj.totalPins = result.data.length;
            result.data.forEach(function (value) {
                var _this = this;
                var myString = value.pin_status.color_code;
                var sillyString = myString.substr(1).slice(0);
                var iconImage = 'assets/markers/' + sillyString + '.png';
                var icon = {
                    url: iconImage,
                    scaledSize: new google.maps.Size(30, 48),
                    labelOrigin: new google.maps.Point(25, 32)
                };
                var marker = new google.maps.Marker({
                    icon: icon,
                    map: obj.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(value.latitude, value.longitude),
                    pinData: value
                });
                /*this.map = new google.maps.Map(mapElemnt.nativeElement, marker);*/
                /*  let infoWindow = new google.maps.InfoWindow({
                content: value.name + " " + value.state
                });*/
                google.maps.event.addListener(marker, 'click', function () {
                    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var timeoption = { hh: 'numeric', mm: 'numeric' };
                    var date = new Date(marker.pinData.pin_updates[0].updated_at);
                    _this.id = marker.pinData.id;
                    _this.Status = marker.pinData.pin_status.pin_status_name;
                    _this.OwnerName = marker.pinData.name;
                    _this.address = marker.pinData.house_number + ' ' + marker.pinData.house_address;
                    _this.pincode = marker.pinData.zipcode;
                    _this.city = marker.pinData.city;
                    _this.state = marker.pinData.state;
                    _this.updateTime = date.toLocaleString("en-US", options);
                    /*  var info=infoWindow.get(marker.map,marker);
                    infoWindow.open(marker.map, marker);*/
                });
            }, _this);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
        this.TerritoryProvider.GetTerritoryList('1').then(function (result) {
            result.data.forEach(function (value) {
                var triangleCoords = new Array();
                var data1 = value;
                var cord = JSON.parse(data1.cords);
                var trrname = data1.territory_name;
                var id = data1.id;
                for (var j = 0; j < cord.length; j++) {
                    var lt = parseFloat(cord[j]['lat']);
                    var ln = parseFloat(cord[j]['lng']);
                    var tmp = { lat: lt, lng: ln };
                    triangleCoords.push(tmp);
                }
                google.maps.Polygon.prototype.getBoundingBox = function () {
                    var bounds = new google.maps.LatLngBounds();
                    this.getPath().forEach(function (triangleCoords, index) {
                        bounds.extend(triangleCoords);
                    });
                    return (bounds);
                };
                // Construct the polygon.
                var bermudaTriangle = new google.maps.Polygon({
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
        }, function (error) {
        });
    };
    MapPage.prototype.AddPin = function () {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.addpinService.createAddPin(userid).then(function (result) {
            if (result.resCode == 1) {
                _this.addpinfrm = result.data;
                _this.overlayHidden = true;
                _this.navCtrl.push('AddpinPage', result.data);
            }
        }, function (error) {
            console.log('error', JSON.stringify(error));
        });
    };
    MapPage.prototype.goToFilter = function () {
        this.navCtrl.push('FilterPage');
    };
    MapPage.prototype.goToList = function () {
        this.navCtrl.setRoot(ListPage);
    };
    MapPage.prototype.loadMap = function () {
        // Create a map after the view is loaded.
        // (platform is already ready in app.component.ts)
        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 36.114647,
                    lng: -115.172813
                },
                zoom: 5 /*,
                tilt: 30*/
            }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(function () { alert('Map is ready!'); });
    };
    MapPage.prototype.onNavingateClick = function () {
        this.getGeolocation();
    };
    MapPage.prototype.getGeolocation = function () {
    };
    MapPage.prototype.onButtonClick = function () {
        var _this = this;
        this.map.clear();
        // Get the location of you
        this.map.getMyLocation()
            .then(function (location) {
            console.log(JSON.stringify(location, null, 2));
            // Move the map camera to the location with animation
            _this.map.animateCamera({
                target: location.latLng,
                zoom: 17,
                tilt: 30
            })
                .then(function () {
                // add a marker
                var marker = _this.map.addMarkerSync({
                    title: '@ionic-native/google-maps plugin!',
                    snippet: 'This plugin is awesome!',
                    position: location.latLng,
                    animation: GoogleMapsAnimation.BOUNCE
                });
                // show the infoWindow
                marker.showInfoWindow();
                // If clicked it, display the alert
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(function () {
                    _this.showToast('clicked!');
                });
            });
        });
    };
    MapPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });
        toast.present(toast);
    };
    MapPage.prototype.editPin = function (id) {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.addpinService.EditPin(userid, id).then(function (result) {
            if (result.resCode == 1) {
                _this.navCtrl.push('EditpinPage', result.data);
            }
        }, function (error) {
            console.log('error', JSON.stringify(error));
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-map',
            templateUrl: 'map.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, NavParams, ToastController, Platform, AddpinProvider, GetPinProvider, Geolocation, GetTerritoryProvider])
    ], MapPage);
    return MapPage;
}());
export { MapPage };
//# sourceMappingURL=map.js.map