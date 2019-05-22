import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { ProfilePage } from '../../pages/profile/profile';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout(){
     console.log('Clicked Logout button');
            window.localStorage.clear();          
         this.navCtrl.setRoot(LoginPage);
          
  }
  gotoProfile()
  {
    this.navCtrl.setRoot(ProfilePage);
  }

}
