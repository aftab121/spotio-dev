import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatIndividualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-individual',
  templateUrl: 'chat-individual.html',
})
export class ChatIndividualPage {
model:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.model=navParams.data['details'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatIndividualPage');
  }

}
