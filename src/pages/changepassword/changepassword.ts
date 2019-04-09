import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  todo={}; 
  message:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public LoginService: LoginProvider) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
changePassword(newpassword,oldpassword,confirmpassword){
	if(newpassword!=confirmpassword){

	}
	else{
var userid=localStorage.getItem('users_data');
    this.LoginService.ChangePassword(oldpassword,newpassword,userid).then((result) => {
          if(result.msgCode == 1){
            this.message=result.msgText;
            console.log('success', JSON.stringify(result));
          }
        }, (error) => {
          console.log('error', JSON.stringify(error));
      });
       
	}
}
}
