import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddpinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpin',
  templateUrl: 'addpin.html',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AddpinPage {
	todo:any=[];
	addpinfrm:any={};	
	options:any=[];
	item:string="";
	dropdown:boolean = true;
	ddl = [{
			"id":0,
			"name": "Select status...",
			"color": "#e60000"
		}];
	Status =[{
		"id":1,
		"name": "Not Contacted",
		"color": "#0000CD"
	},{
		"id":2,
		"name": "Not Home",
		"color": "#e60000"
	},
	{
		"id":3,
		"name":"Not Interested",
		"color":"#FFD700"
	},
	{
		"id":4,
		"name": "Lead",
		"color": "#F19B2B"
	},{
		"id":5,
		"name": "Sold",
		"color": "green"
	},
	]
	constructor(public navCtrl: NavController, public navParams: NavParams,private _eref: ElementRef) {
debugger
		this.addpinfrm=this.navParams.data.sort((a, b) => a.sort <= b.sort ? -1 : 1);
		
	}

	onClick(event) {
	   if (!this._eref.nativeElement.contains(event.target)) // or some similar check
	     this.closeDdl();
	}


	closeDdl(){
		alert('c;osied');
	}
	ionViewDidLoad() {
	console.log('ionViewDidLoad AddpinPage');
	}

	ToggleDropDown(){
		this.dropdown = !this.dropdown;
	}
	 OnChange(obj) {
	 	debugger
	 	this.ddl[0].name=obj;
      console.log(obj);
    } 	

reformat(str: string) {
  if (str) {
  	var st=str.replace(/\n/g, ',').replace(/\s/g, '').split(',');
  	this.options.push(st);
    return str.replace(/\n/g, ',').replace(/\s/g, '').split(',');
  }
return [];
}

isAvailable(item) {

  if (item && item.indexOf('\n') !== -1) {
    return true;
  }
  return false;
}
savePin(){
 console.log(this.todo);
}
}
