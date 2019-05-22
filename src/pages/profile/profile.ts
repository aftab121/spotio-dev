import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
model:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public profileService:ProfileProvider) {
  }

  ionViewDidLoad() {
   var userid = localStorage.getItem('users_data');
		this.profileService.getProfile(userid).then((result) => {
			if (result.ResCode == 102) {
				this.model=result.ResData;
			}
			else {
				alert(result.ResMsg)
			}
		}, (error) => {
			console.log('error', JSON.stringify(error));
		});
  }

}
