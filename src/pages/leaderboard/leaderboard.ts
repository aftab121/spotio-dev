import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public leaderboardService: LeaderboardProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }
getLeaderBoardData(){
	var userid=localStorage.getItem('users_data');
	this.leaderboardService.getLeaderboardData(userid).then((result)=>{
		if(result.code==1){

		}
		else{
			
		}

	},(error)=>{
		console.log("Error", JSON.stringify(error));
	})
}
}
