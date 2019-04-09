import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinDetailsPage } from './pindetails';

@NgModule({
  declarations: [
    PinDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PinDetailsPage),
  ],
})
export class PinDetailsPageModule {}