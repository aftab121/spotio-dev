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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangepasswordPage = /** @class */ (function () {
    function ChangepasswordPage(navCtrl, navParams, LoginService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.LoginService = LoginService;
        this.todo = {};
        this.message = "";
        this.showMsg = false;
    }
    ChangepasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangepasswordPage');
    };
    ChangepasswordPage.prototype.changePassword = function (newpassword, oldpassword, confirmpassword) {
        var _this = this;
        if (newpassword != confirmpassword) {
            this.message = "New password and confirm password do not match";
            this.showMsg = true;
        }
        else {
            var userid = localStorage.getItem('users_data');
            this.LoginService.ChangePassword(oldpassword, newpassword, userid).then(function (result) {
                if (result.msgCode == 1) {
                    _this.message = result.msgText;
                    _this.showMsg = true;
                    console.log('success', JSON.stringify(result));
                }
                else if (result.msgCode == 2) {
                    _this.message = result.msgText;
                    _this.showMsg = true;
                }
            }, function (error) {
                console.log('error', JSON.stringify(error));
            });
        }
    };
    ChangepasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-changepassword',
            templateUrl: 'changepassword.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoginProvider])
    ], ChangepasswordPage);
    return ChangepasswordPage;
}());
export { ChangepasswordPage };
//# sourceMappingURL=changepassword.js.map