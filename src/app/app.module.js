var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { SettingsPage } from '../pages/settings/settings';
import { ChatPage } from '../pages/chat/chat';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { CreateAppointmentPage } from '../pages/create-appointment/create-appointment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PinDetailsPage } from '../pages/pindetails/pindetails';
import { DatePickerModule } from 'ion-datepicker';
import { HttpModule } from '@angular/http';
import { LoginProvider } from '../providers/login/login';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { AddpinProvider } from '../providers/addpin/addpin';
import { GetPinProvider } from '../providers/get-pin/get-pin';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GetTerritoryProvider } from '../providers/get-territory/get-territory';
import { GlobalProvider } from '../providers/global/global';
import { FilterProvider } from '../providers/filter/filter';
import { PinlistProvider } from '../providers/pinlist/pinlist';
import { AppointmentProvider } from '../providers/appointment/appointment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                LoginPage,
                LeaderboardPage,
                SettingsPage,
                ChatPage,
                AppointmentsPage,
                CreateAppointmentPage,
                PinDetailsPage,
                ForgetPasswordPage,
                ResetpasswordPage,
                ChangepasswordPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                DatePickerModule,
                HttpModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                LoginPage,
                LeaderboardPage,
                SettingsPage,
                ChatPage,
                AppointmentsPage,
                CreateAppointmentPage,
                PinDetailsPage,
                ForgetPasswordPage,
                ResetpasswordPage,
                ChangepasswordPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                DatePicker,
                Calendar,
                Geolocation,
                GoogleMaps,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                LoginProvider,
                AddpinProvider,
                GetPinProvider,
                GetTerritoryProvider,
                GlobalProvider,
                FilterProvider,
                PinlistProvider,
                AppointmentProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map