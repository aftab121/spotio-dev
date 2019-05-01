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
  Generated class for the LeaderboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LeaderboardProvider = /** @class */ (function () {
    function LeaderboardProvider(http) {
        this.http = http;
        console.log('Hello LeaderboardProvider Provider');
    }
    LeaderboardProvider.prototype.getLeaderboardData = function (userid) {
        var _this = this;
        return new Promise(function (resolve) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new RequestOptions({ headers: headers });
            var credentials = JSON.stringify({
                userid: userid
            });
            var link = 'https://clients.managedcrmsolution.com/public/Api/userDashboard';
            _this.http.post(link, credentials, { headers: headers }).toPromise()
                .then(function (response) {
                resolve(response.json());
            });
        });
    };
    LeaderboardProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], LeaderboardProvider);
    return LeaderboardProvider;
}());
export { LeaderboardProvider };
//# sourceMappingURL=leaderboard.js.map