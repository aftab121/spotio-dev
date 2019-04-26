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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, LoginService, globalService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.LoginService = LoginService;
        this.globalService = globalService;
        this.loadingCtrl = loadingCtrl;
        this.todo = {};
        this.message = "";
        if (localStorage.getItem('users_data')) {
            this.navCtrl.setRoot('MapPage');
        }
        /*  else{
            this.navCtrl.setRoot(LoginPage);
          }*/
    }
    LoginPage.prototype.logForm = function () {
        console.log(this.todo);
    };
    LoginPage.prototype.goToLogin = function (password, email) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Loading...</div>',
            duration: 5000
        });
        loading.present();
        this.LoginService.UserLogin(password, email).then(function (result) {
            if (result.code == 1) {
                //        obj.navCtrl.push(DashboardPage);
                loading.dismiss();
                window.localStorage.users_data = JSON.stringify(result.userid);
                window.localStorage.username = result.data.full_name;
                var username = result.data.full_name.split(' ');
                _this.globalService.userNameChar = username[0][0] + username[1][0];
                _this.navCtrl.setRoot('MapPage');
            }
            else if (result.code == 2) {
                _this.message = result.msg;
            }
        }, function (error) {
            console.log('error', JSON.stringify(error));
        });
        //this.navCtrl.setRoot('MapPage');
    };
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.goToForget = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    LoginPage.prototype.presentLoadingCustom = function () {
        /* loading.onDidDismiss(() => {
           console.log('Dismissed loading');
         });
       
         loading.present();*/
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoginProvider, GlobalProvider, LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map