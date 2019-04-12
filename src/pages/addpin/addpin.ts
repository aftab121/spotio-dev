import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddpinProvider} from '../../providers/addpin/addpin';
import {FilterProvider} from '../../providers/filter/filter';
import {MapPage} from '../../pages/map/map';


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
	userid:any;
	todo: any = {};
	custum:any={};
	addpinfrm: any = {};
	options: any = [];
	check: boolean = false;
	selectedEntry: string = "";
	dropdown: boolean = true;
	productname: string = "";
	statusId:string="";
	assignedId:string="";
	array:any=[];
	newModel:any={};
	message:any={};
	assignedTo:Array<{ id: number, full_name: string,color:string, checked: false }> = [];

	ddl = [{
		"id": 0,
		"name": "Select status...",
		"color": "#e60000"
	}];
	Status:Array<{ id: number, pin_status_name: string,color_code:string, checked: false }> = [];

	/*Status = [{
		"id": 1,
		"name": "Not Contacted",
		"color": "#0000CD"
	}, {
		"id": 2,
		"name": "Not Home",
		"color": "#e60000"
	},
	{
		"id": 3,
		"name": "Not Interested",
		"color": "#FFD700"
	},
	{
		"id": 4,
		"name": "Lead",
		"color": "#F19B2B"
	}, {
		"id": 5,
		"name": "Sold",
		"color": "green"
	},
	]*/
	constructor(public navCtrl: NavController, public navParams: NavParams, private _eref: ElementRef, public addpinService:AddpinProvider, public filterService:FilterProvider) {
		this.userid=localStorage.getItem('users_data');
		this.addpinfrm = this.navParams.data.sort((a, b) => a.sort <= b.sort ? -1 : 1);
		this.userData();

	}

	onClick(event) {
		// if (!this._eref.nativeElement.contains(event.target)) // or some similar check
			/*this.closeDdl();*/
	}
	userData() {
		var userid = localStorage.getItem('users_data');
		this.filterService.getUser(userid).then((result) => {
			if (result.resCode == 1) {
				this.assignedTo = result.data;
			}
		});
		this.filterService.getPin(userid).then((result) => {
			if (result.resCode == 1) {
				this.Status = result.data;
			}
		});
	}

	/*closeDdl() {
		alert('c;osied');
	}*/

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddpinPage');
	}

	ToggleDropDown() {
		this.dropdown = !this.dropdown;
	}

	OnChange(obj,id) {		
		this.ddl[0].name = obj;
		this.statusId=id;
		console.log(obj);
		this.dropdown = !this.dropdown;
	}

	reformat(str: string) {
		if (str) {
			var st = str.replace(/\n/g, ',').split(',');			
			return str.replace(/\n/g, ',').split(',');
		}
		return [];
	}
	
	isAvailable(item) {

		if (item && item.indexOf('\n') !== -1) {
			return true;
		}
		return false;
	}

	savePin() {		
		debugger;	
		this.todo.userid=localStorage.getItem('users_data');	
		this.todo.current_status=this.statusId;
		this.todo.assigned_to=this.assignedId;
		this.todo.phone_number=this.todo.phonenumber;
		delete this.todo.phonenumber;
		var note=this.todo.Note;
		this.custum['Note']=note;
		delete this.todo.Note;
		this.todo.custom_input=this.custum;
		var json=JSON.stringify(this.todo);
		 this.addpinService.AddMarker(json).then((result) => {
          if(result.code == 1){           
          console.log("success");
          this.navCtrl.setRoot(MapPage);          
          }
          else if(result.code==2){
            console.log("error");
          }
        }, (error) => {
          console.log('error', JSON.stringify(error));
      });
		console.log(this.todo);
	}

	onSelectionChange(name, entry) {		
		this.selectedEntry = entry;
		this.custum[name]=entry;
	}
	
	addCheckbox(event, val : String,name) { 		
		var x=this.custum[name];
		if (event.checked) {
			if (x != undefined) {				
				if (val == "BothProduct" || x != val) {
					/*this.check=!this.check;*/
					this.custum[name] = "Both Product";
					this.array.push(val);
				}
			}
			else {
				this.custum[name] = val;
				this.array.push(val);
			}

		}
		else {			
			for (var key in this.array) {
				if (this.array[key] == val) {
					delete this.array[key];
				}
			}
			let newArr = new Array();
			for (let k = 0; k < this.array.length; k++) {				
				if (this.array[k] != undefined) {
					newArr.push(this.array[k]);
				}
			}
			this.array = new Array();
			this.array = newArr;
			if (this.array.length == 1) {
				for (let i = 0; i < this.array.length; i++) {
					this.custum[name] = this.array[i];
				}
			}
			else if(this.array.length>1) {
				delete this.custum[name];
				this.custum[name] = "Both Product";
			}
			else{
				delete this.custum[name];
			}
		}
  } 

  changeAssignee(id,item){
    document.getElementById('assigned').innerText=item;
    this.assignedId=id;
  }
}
