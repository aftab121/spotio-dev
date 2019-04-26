import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {LeaderboardProvider} from '../../providers/leaderboard/leaderboard';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
items:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public leaderboardService: LeaderboardProvider,public loadingCtrl: LoadingController) {
   this.getLeaderBoardData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }
getLeaderBoardData(){
	 let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Please wait...',
      //duration: 5000
    });
	 loading.present();
	var userid=localStorage.getItem('users_data');
	this.leaderboardService.getLeaderboardData(userid).then((result)=>{
		if(result.code==1){
			this.items=result.leaderboardData;			
		}
		else{

		}
		loading.dismiss();

	},(error)=>{
		console.log("Error", JSON.stringify(error));
	})
}
}
