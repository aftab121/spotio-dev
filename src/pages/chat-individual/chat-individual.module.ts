import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatIndividualPage } from './chat-individual';

@NgModule({
  declarations: [
    ChatIndividualPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatIndividualPage),
  ],
})
export class ChatIndividualPageModule {}
