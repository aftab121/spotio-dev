var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { SettingsPage } from '../pages/settings/settings';
import { ChatPage } from '../pages/chat/chat';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { GlobalProvider } from "../providers/global/global";
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, globalService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.globalService = globalService;
        this.username = [];
        this.firstcahr = "";
        this.rootPage = LoginPage;
        this.initializeApp();
        this.profileName();
        // used for an example of ngFor and navigation
        this.pages = [
            {
                title: 'PINS',
                component: MapPage,
                icon: 'pin',
            },
            {
                title: 'LEADERBOARD',
                component: LeaderboardPage,
                icon: 'trophy',
            },
            {
                title: 'CHAT',
                component: ChatPage,
                icon: 'chatbubbles',
            },
            {
                title: 'APPOINTMENTS',
                component: AppointmentsPage,
                icon: 'calendar'
            },
            {
                title: 'SETTINGS',
                component: SettingsPage,
                icon: 'settings'
            },
            {
                title: 'CHANGE PASSWORD',
                component: ChangepasswordPage,
                icon: 'key'
            }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.pages.map(function (p) {
            return p['active'] = (page.component === p.component);
        });
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.profileName = function () {
        if (localStorage.getItem('username') != null) {
            this.username = localStorage.getItem('username').split(' ');
            this.globalService.userNameChar = this.username[0][0] + this.username[1][0];
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, GlobalProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map