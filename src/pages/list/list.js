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
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';
import { PinDetailsPage } from '../../pages/pindetails/pindetails';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
import { AddpinProvider } from '../../providers/addpin/addpin';
var ListPage = /** @class */ (function () {
    //items: any=[];
    function ListPage(navCtrl, navParams, pinlistService, addpinService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pinlistService = pinlistService;
        this.addpinService = addpinService;
        this.addpinfrm = {};
        this.overlayHidden = true;
        this.items = [];
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
    ListPage.prototype.goToFilter = function () {
        this.navCtrl.push('FilterPage');
    };
    ListPage.prototype.showOverlay = function () {
        this.overlayHidden = false;
    };
    ListPage.prototype.hideOverlay = function () {
        this.overlayHidden = true;
    };
    ListPage.prototype.AddPin = function () {
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
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        /* this.navCtrl.push(PinDetailsPage, {
           item: item
         });*/
        this.navCtrl.push(PinDetailsPage, { data: item.pindata });
    };
    ListPage.prototype.goToMap = function () {
        this.navCtrl.setRoot(MapPage);
    };
    ListPage.prototype.getPinLIst = function () {
        var _this = this;
        var userid = localStorage.getItem("users_data");
        this.pinlistService.getPinList(userid).then(function (result) {
            if (result.code == 1) {
                result.data.forEach(function (value) {
                    var options = { year: 'numeric', month: 'short', day: 'numeric' };
                    var time = { hour: 'numeric', minute: 'numeric' };
                    var dateTime = new Date(value.created_at);
                    this.items.push({
                        id: value.id,
                        title: value.name,
                        address1: value.house_number,
                        address2: value.house_address,
                        city: value.city,
                        state: value.state,
                        date: dateTime.toLocaleDateString("en-US", options),
                        time: dateTime.toLocaleTimeString("en-US", time),
                        pin_status: value.pin_status,
                        user: value.user,
                        pindata: value
                        //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                    });
                }, _this);
            }
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    ListPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.getPinLIst();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, PinlistProvider, AddpinProvider])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map