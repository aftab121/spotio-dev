import { NgModule } from '@angular/core';
import { LoadingModalComponent } from './loading-modal/loading-modal';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
@NgModule({
	declarations: [LoadingModalComponent,
    ContentDrawerComponent,
    ContentDrawerComponent],
	imports: [],
	exports: [LoadingModalComponent,
    ContentDrawerComponent,
    ContentDrawerComponent]
})
export class ComponentsModule {}
