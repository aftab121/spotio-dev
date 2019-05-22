import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatIndividualPage } from '../../pages/chat-individual/chat-individual';
import { ChatProvider } from '../../providers/chat/chat';

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
  userid:any;
items: Array<{id:number, img: string, full_name: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService:ChatProvider) {
   // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
  this.items = [];
/*  for (let i = 1; i < 11; i++) {
      this.items.push({
        id:i,
        title: 'Pooja Rai',
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        lastMessage:'How are you my friend...',
        time:'2h ago'
      });
    }*/
  }

  ionViewDidLoad() {      
       this.userid=localStorage.getItem('users_data');
      this.chatService.chatList(this.userid).then((result) => {
          if(result.ResCode == 102){
           this.items=result.ResData;
          }
          else{
            alert(result.ResMsg)
          }
        }, (error) => {
          console.log('error', JSON.stringify(error));
      });
  }

  gotoChat(id,name,img){
    this.navCtrl.setRoot('ChatIndividualPage',{details:{id:id,name:name,img:img}});
  }
 getChatList(){

 }

}
