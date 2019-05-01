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
import { LeaderboardProvider } from '../../providers/leaderboard/leaderboard';
/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeaderboardPage = /** @class */ (function () {
    function LeaderboardPage(navCtrl, navParams, leaderboardService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.leaderboardService = leaderboardService;
        this.loadingCtrl = loadingCtrl;
        this.items = [];
        this.getLeaderBoardData();
    }
    LeaderboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaderboardPage');
    };
    LeaderboardPage.prototype.getLeaderBoardData = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Please wait...',
        });
        loading.present();
        var userid = localStorage.getItem('users_data');
        this.leaderboardService.getLeaderboardData(userid).then(function (result) {
            if (result.code == 1) {
                _this.items = result.leaderboardData;
            }
            else {
            }
            loading.dismiss();
        }, function (error) {
            console.log("Error", JSON.stringify(error));
        });
    };
    LeaderboardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-leaderboard',
            templateUrl: 'leaderboard.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LeaderboardProvider, LoadingController])
    ], LeaderboardPage);
    return LeaderboardPage;
}());
export { LeaderboardPage };
//# sourceMappingURL=leaderboard.js.map