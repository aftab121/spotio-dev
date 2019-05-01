import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigationMapPage } from './navigation-map';

@NgModule({
  declarations: [
    NavigationMapPage,
  ],
  imports: [
    IonicPageModule.forChild(NavigationMapPage),
  ],
})
export class NavigationMapPageModule {}
