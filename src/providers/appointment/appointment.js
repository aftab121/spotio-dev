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
import { Injectable } from '@angular/core';
/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AppointmentProvider = /** @class */ (function () {
    function AppointmentProvider(http) {
        this.http = http;
        console.log('Hello AppointmentProvider Provider');
    }
    AppointmentProvider.prototype.createAppointment = function (data) {
        var _this = this;
        debugger;
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                userid: data.userid,
                pin_id: data.pin_id,
                pin_name: data.pin_name,
                pin_status: data.pin_status_id,
                location: data.location,
                start_date: data.startDate,
                end_date: data.endDate,
                notes: data.note
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/addAppointment';
            _this.http.post(link, data, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    AppointmentProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], AppointmentProvider);
    return AppointmentProvider;
}());
export { AppointmentProvider };
//# sourceMappingURL=appointment.js.map