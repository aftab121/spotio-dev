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
import { AddpinProvider } from '../../providers/addpin/addpin';
import { CreateAppointmentPage } from '../../pages/create-appointment/create-appointment';
var PinDetailsPage = /** @class */ (function () {
    function PinDetailsPage(navCtrl, navParams, addpinService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.addpinService = addpinService;
        this.items = [];
        // If we navigated to this page, we will have an item available as a nav param
        if (navParams.data["data"] != undefined) {
            this.items = navParams.data["data"];
            var options = { year: 'numeric', month: 'short', day: 'numeric' };
            var time = { hour: 'numeric', minute: 'numeric' };
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
    PinDetailsPage.prototype.getNavigation = function (houseNum, houseaddress, city, state) {
        var endorgin = new Array({});
    };
    PinDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot(MapPage);
    };
    PinDetailsPage.prototype.editPin = function (id) {
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
    PinDetailsPage.prototype.gotoAppointment = function (data) {
        this.navCtrl.push(CreateAppointmentPage, { data: data });
    };
    PinDetailsPage = __decorate([
        Component({
            selector: 'page-pindetails',
            templateUrl: 'pindetails.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AddpinProvider])
    ], PinDetailsPage);
    return PinDetailsPage;
}());
export { PinDetailsPage };
//# sourceMappingURL=pindetails.js.map