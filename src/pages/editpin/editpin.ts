import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpinProvider} from '../../providers/addpin/addpin'


/**
 * Generated class for the EditpinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-editpin',
	templateUrl: 'editpin.html',
})
export class EditpinPage {
	pininfo:any={};
	pinid: any;
	todo: any = {};
	custum: any = {};
	addpinfrm: any = {};
	options: any = [];
	array:any=[];
    selectedEntry: string = "";
    dropdown: boolean = true;
    assignedTo:any= [];
    statusId:string="";
	ddl = [{
		"id": 0,
		"name": "Select status...",
		"color": "#e60000"
	}];
	Status:Array<{ id: number, pin_status_name: string,color_code:string, checked: false }> = [];
	custom_options:any={};
	newModel:any={};
	message:any={};
	constructor(public navCtrl: NavController, public navParams: NavParams, public addpinService: AddpinProvider) {
		debugger
		 this.addpinfrm = this.navParams.data.companyCustomFields;
        this.pininfo=this.navParams.data.pinInfo;
        this.Status=this.navParams.data.pinStatus;
        for(var key in this.navParams.data.userList){
        	this.assignedTo.push({id:key,full_name:this.navParams.data.userList[key],checked:false});
        }
        this.todo=this.navParams.data.pinInfo;
        this.custom_options=JSON.parse(this.todo.custom_options);
        console.log(this.custom_options["Why_Not_Interested?"]);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditpinPage');
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
ToggleDropDown() {
		this.dropdown = !this.dropdown;
	}

	OnChange(obj,id) {		
		this.ddl[0].name = obj;
		this.statusId=id;
		console.log(obj);
		this.dropdown = !this.dropdown;
	}

}
