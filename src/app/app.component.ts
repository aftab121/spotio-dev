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
import {ChangepasswordPage} from '../pages/changepassword/changepassword'
import { GlobalProvider } from "../providers/global/global";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  username:any=[];
  firstcahr:string="";
  rootPage: any = LoginPage;  
  pages: Array<{title: string, component: any , icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public globalService : GlobalProvider) { 
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

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }


  openPage(page) {   
   
   
      this.pages.map(p => {
        return p['active'] = (page.component === p.component);
      });
      this.nav.setRoot(page.component);
  
    }  
 
  profileName(){       
        if(localStorage.getItem('username')!=null){
         this.username=localStorage.getItem('username').split(' ');
         this.globalService.userNameChar=this.username[0][0]+this.username[1][0];          
        }        
    }
}
