var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PinlistProvider } from '../../providers/pinlist/pinlist';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(navCtrl, navParams, viewCtrl, renderer, pinlistService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.pinlistService = pinlistService;
        this.items = [];
        debugger;
        this.getPinLIst(this.str);
        /* this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-modal', true);*/
        this.str = navParams.data['data'];
        /*	if(this.str!=undefined){
                this.getItems(this.str);
            }*/
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalPage');
    };
    ModalPage.prototype.closeModal = function (data) {
        this.viewCtrl.dismiss(data);
    };
    ModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalPage.prototype.getPinLIst = function (ev) {
        var _this = this;
        var userid = localStorage.getItem("users_data");
        this.pinlistService.getPinList(userid).then(function (result) {
            if (result.code == 1) {
                _this.items = result.data;
            }
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    ModalPage.prototype.getItems = function (ev) {
        this.getPinLIst();
        var val = ev.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
        }
    };
    ModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal',
            templateUrl: 'modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, Renderer, PinlistProvider])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.js.map