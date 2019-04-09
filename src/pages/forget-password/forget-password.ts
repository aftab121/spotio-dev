import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ResetpasswordPage} from '../../pages/resetpassword/resetpassword';


/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
public Content1: boolean = true; 
public Content2: boolean = false; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }   
  goToPassword(){
     this.Content1 = !this.Content1;
     this.Content2=!this.Content2;
  	//this.navCtrl.push(ResetpasswordPage);
  }

}
