import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatIndividualPage } from '../../pages/chat-individual/chat-individual';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
 selectedItem: any;
  icons: string[];
items: Array<{id:number,title: string, note: string, icon: string,lastMessage:string,time:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
  this.items = [];
  for (let i = 1; i < 11; i++) {
      this.items.push({
        id:i,
        title: 'Pooja Rai',
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        lastMessage:'How are you my friend...',
        time:'2h ago'
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  gotoChat(id,name){
    this.navCtrl.push('ChatIndividualPage',{details:{id:id,name:name}});
  }

}
