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
  Generated class for the GetPinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetPinProvider = /** @class */ (function () {
    function GetPinProvider(http) {
        this.http = http;
        console.log('Hello LoginProvider Provider');
    }
    GetPinProvider.prototype.GetPinList = function (UserId, current, pin_status, assigned_to, start_date, custom_date, end_date) {
        var _this = this;
        if (current === void 0) { current = '1'; }
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                userid: UserId,
                assigned_to: assigned_to,
                status: pin_status,
                start_date: start_date,
                end_date: end_date,
                custom: custom_date
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/GetMarkerList?page=' + current;
            _this.http.post(link, credentials, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    GetPinProvider.prototype.GetPinCount = function (UserId) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                userid: UserId
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/displayPinsCount';
            _this.http.post(link, credentials, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    GetPinProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], GetPinProvider);
    return GetPinProvider;
}());
export { GetPinProvider };
//# sourceMappingURL=get-pin.js.map