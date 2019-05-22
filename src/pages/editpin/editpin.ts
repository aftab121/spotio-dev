import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpinProvider} from '../../providers/addpin/addpin'
import {MapPage} from '../../pages/map/map';

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
	arr_val:string="";
	pininfo: any = {};
	pinid: any;
	todo: any = [];
	custum: any = {};
	addpinfrm: any = {};
	radio: Array<{ name: string, isChecked: boolean }> = [];
	check:any=[];
	array: any = [];
	selectedEntry: string = "";
	dropdown: boolean = true;
	assignedTo: any = [];
	statusId: string = "";
	model:any = [];
	ddl = [{
		"id": 0,
		"name": "Select status...",
		"color": "#e60000"
	}];
	Status: Array<{ id: number, pin_status_name: string, color_code: string, checked: false }> = [];
	custom_options: any = {};
	newModel: any = {};
	message: any = {};
	constructor(public navCtrl: NavController, public navParams: NavParams, public addpinService: AddpinProvider) {
		debugger
		this.addpinfrm = this.navParams.data.companyCustomFields;
		this.pininfo = this.navParams.data.pinInfo;
		this.Status = this.navParams.data.pinStatus;
		this.todo = this.navParams.data.pinInfo;
		for(var k in this.Status){
			if(this.Status[k].id==this.todo.current_status)
			{
				this.OnChange(this.Status[k].pin_status_name,this.todo.current_status)
			}
		}		
		for (var key in this.navParams.data.userList) {			
			this.assignedTo.push({ id: key, full_name: this.navParams.data.userList[key], checked: false });
		}
		
		this.statusId=this.todo.current_status;		
		this.custom_options = this.todo.custom_options!=null? JSON.parse(this.todo.custom_options):[];	
		this.custum['Note']= this.custom_options.length>0? this.custom_options.custom_input['Note']:"";
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditpinPage');
	}

	reformat(obj, id){		
		this.radio = [];		
		var st = obj.replace(/\n/g, ',').split(',');
		for (var i = 0; i < st.length; i++) {
			var second_val:string =st[i];
			if (id == 7) {
				this.arr_val=this.custom_options.length>0?this.custom_options.custom_input['Not_Interested']:"";				
				if (this.arr_val!="" && this.arr_val.trim().toLowerCase() == second_val.trim().toLowerCase()) {
					this.radio.push({ name: st[i], isChecked: true });
					this.custum['Not_Interested']=st[i];
					console.log(this.custum);
				}
				else {
					this.radio.push({ name: st[i], isChecked: false });
				}
			}
			if (id == 8) {
				this.arr_val=this.custom_options.length>0?this.custom_options.custom_input['Interested']:"";	
				if (this.arr_val!="" && this.arr_val.trim().toLowerCase() == second_val.trim().toLowerCase()) {
					this.radio.push({ name: st[i], isChecked: true });	
					this.custum['Interested']=st[i];
					console.log(this.custum);				
				}
				else {
					this.radio.push({ name: st[i], isChecked: false });
				}
			}
		}		
		return obj.replace(/\n/g, ',').split(',');
	}

	isAvailable(item) {

		if (item && item.indexOf('\n') !== -1) {
			return true;
		}
		return false;
	}
	onSelectionChange(name, entry) {
		this.selectedEntry = entry;
		this.custum[name] = entry;
	}

	addCheckbox(event, val: String, name) {
		var x = this.custum[name];
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
			else if (this.array.length > 1) {
				delete this.custum[name];
				this.custum[name] = "Both Product";
			}
			else {
				delete this.custum[name];
			}
		}
	}
	ToggleDropDown() {
		this.dropdown = !this.dropdown;
	}

	OnChange(obj, id) {
		this.ddl[0].name = obj;
		this.statusId = id;
		console.log(obj);
		this.dropdown = true;
	}

	updatePin() {
		
		this.model.push({userid:localStorage.getItem('users_data'),
		current_status : this.statusId,
		custom_input : this.custum,
		current_latitude : this.todo.latitude,
		current_longitude : this.todo.longitude,
		pin_id : this.todo.id,
		//this.model.push({phone_number:this.todo['phone_number'],name: this.todo['name'],userid:this.todo['userid'],current_status:this.todo['current_status'],assigned_to:this.todo['assigned_to'],custom_input:this.custum });
		//this.todo.custom_options=JSON.stringify(this.model);
	    assigned_to : this.todo.assigned_to,
		house_number : this.todo.house_number,
		house_address : this.todo.house_address,
		unit : this.todo.unit,
		city : this.todo.city,
		state : this.todo.state,
		zipcode : this.todo.zipcode,
		name : this.todo.name,
		phone_number : this.todo.phone_number,
		email : this.todo.email});
		debugger;
		var json = JSON.stringify(this.model[0]);
		this.model=[];
		this.addpinService.updatePin(json).then((result) => {
			if (result.code == 1) {
				console.log("success");
				this.navCtrl.setRoot(MapPage);
			}
			else if (result.code == 2) {
				this.message = result.msg;
				//this.presentAlert(this.message);
				console.log("error");
			}
		}, (error) => {
			console.log('error', JSON.stringify(error));
		});
		console.log(this.todo);
	}

 back(){
   this.navCtrl.setRoot(MapPage)
  }
}
