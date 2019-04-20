import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import {ForgetPasswordPage} from '../../pages/forget-password/forget-password';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public LoginService: LoginProvider, public globalService : GlobalProvider,public loadingCtrl: LoadingController) {
   if(localStorage.getItem('users_data')){
     this.navCtrl.setRoot('MapPage');
   }
 /*  else{
     this.navCtrl.setRoot(LoginPage);
   }*/
  }
  todo = {};
  message:any="";

  logForm() {
    console.log(this.todo);
  }

  goToLogin(password, email) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<ion-spinner name="dots"></ion-spinner>',
      duration: 5000
    });
    loading.present();
    this.LoginService.UserLogin(password, email).then((result) => {
      if (result.code == 1) {
        //        obj.navCtrl.push(DashboardPage);
        loading.dismiss();
        window.localStorage.users_data = JSON.stringify(result.userid);
        window.localStorage.username = result.data.full_name;
        var username = result.data.full_name.split(' ');
        this.globalService.userNameChar = username[0][0] + username[1][0];
        this.navCtrl.setRoot('MapPage');
      }
      else if (result.code == 2) {
        this.message = result.msg;
      }
    }, (error) => {
      console.log('error', JSON.stringify(error));
    });
    //this.navCtrl.setRoot('MapPage');
  }
   
 
  goToRegister(){
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToForget(){
     this.navCtrl.push(ForgetPasswordPage);
  }
presentLoadingCustom() {
 

 /* loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();*/
  }
}
