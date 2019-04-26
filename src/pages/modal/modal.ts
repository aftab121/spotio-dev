import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-modal',
	templateUrl: 'modal.html',
})
export class ModalPage {
list:any=[];
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public renderer: Renderer) {
	
	/* this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-modal', true);*/
	this.list=navParams.data['data'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ModalPage');
	}
	public closeModal(data) {
		this.viewCtrl.dismiss(data);
	}
	public dismiss() {
		this.viewCtrl.dismiss();
	}
}
