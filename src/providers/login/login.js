var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginProvider = /** @class */ (function () {
    function LoginProvider(http) {
        this.http = http;
        console.log('Hello LoginProvider Provider');
    }
    LoginProvider.prototype.UserLogin = function (password, email) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                password: password,
                email: email
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/userLogin';
            _this.http.post(link, credentials, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    LoginProvider.prototype.ChangePassword = function (oldpassword, newpassword, userid) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                userid: userid,
                currentpassword: oldpassword,
                newpassword: newpassword
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/changePassword';
            _this.http.post(link, credentials, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    LoginProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], LoginProvider);
    return LoginProvider;
}());
export { LoginProvider };
//# sourceMappingURL=login.js.map