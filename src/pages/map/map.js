var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, GoogleMapsAnimation } from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.overlayHidden = true;
    }
    MapPage.prototype.showOverlay = function () {
        this.overlayHidden = false;
    };
    MapPage.prototype.hideOverlay = function () {
        this.overlayHidden = true;
    };
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    MapPage.prototype.AddPin = function () {
        //alert('cliecked add pins'); 
        this.navCtrl.push('Add');
        this.overlayHidden = true;
    };
    MapPage.prototype.goToFilter = function () {
        this.navCtrl.push('FilterPage');
    };
    MapPage.prototype.loadMap = function () {
        // Create a map after the view is loaded.
        // (platform is already ready in app.component.ts)
        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 43.0741704,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        });
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
    MapPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-map',
            templateUrl: 'map.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController])
    ], MapPage);
    return MapPage;
}());
export { MapPage };
//# sourceMappingURL=map.js.map