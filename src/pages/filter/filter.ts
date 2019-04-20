import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { FilterProvider } from '../../providers/filter/filter';
import {MapPage} from '../../pages/map/map';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-filter',
	templateUrl: 'filter.html',
})
export class FilterPage {
	myDate1: any;
	myDate2: any;
	clear: boolean = false;
	dateFilter = {};
	Status : Array<{ id: number, pin_status_name: string,color_code:string, isChecked : false }> = [];
	assignee : Array<{ id: number, full_name: string,color:string, isChecked: false }> = [];
	data_filter:any=[];	
	date:Array<{ from: string, to: string, isChecked: boolean, day:string }> = [];
	id:number=0;
	constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker, private calendar: Calendar, public filterService: FilterProvider) {
		this.getUserList();
		this.getStatus();		
		this.dateFilter = {
			today: false,
			yesterday: false,
			thisWeek: false,
			lastWeek: false,
			thisMonth: false,
			lastMonth: false,
			thisYear: false,
			lastYear: false,
			custom:false
		};
	}
	todo = {};
	filter: number = 1;
	ionViewDidLoad() {
		console.log('ionViewDidLoad FilterPage');
	}

	ClearSelection() {
		this.clear = false;
		let data = this.dateFilter;
		Object.keys(data).forEach(key => {
			this.dateFilter[key] = false;
		});
		let data1 = this.Status;
		Object.keys(data1).forEach(key => {
			this.Status[key]['isChecked'] = false;
		});
		let data2 = this.assignee;
		Object.keys(data2).forEach(key => {
			this.assignee[key]['isChecked'] = false;
		});
	}

	LoginRemCheck(data) {
		let i = 0;
		Object.keys(data).forEach(key => {
			if (data[key] == true) {			
				i++;
			}
		});
		if (i > 0) {
			this.clear = true;

		}
	}
	DateCheck(data) {
		let i = 0;
		Object.keys(data).forEach(key => {
			if (data[key] == true) {			
				i++;
				this.DateConvert(key,true);
			}
			else{
				this.DateConvert(key,false);
			}
		});
		if (i > 0) {
			this.clear = true;
		}
	}
	changeFilter(val) {		
		this.filter = val;
	}
	goToMap() {
		this.data_filter=[];
		for (var key in this.Status) {
			if (this.Status[key].isChecked) {
				if (this.data_filter['status'] != null || this.data_filter['status'] != undefined) {
					this.data_filter['status'] = this.data_filter['status'] + ',' + this.Status[key].id;
				}
				else {
					this.data_filter['status'] = this.Status[key].id.toString();
				}
			}
		}
		for (var key in this.assignee) {
			if (this.assignee[key].isChecked) {
				if (this.data_filter['assigned_to'] != null || this.data_filter['assigned_to'] != undefined) {
					this.data_filter['assigned_to'] = this.data_filter['assigned_to'] + ',' + this.assignee[key].id;
				}
				else {
					this.data_filter['assigned_to'] = this.assignee[key].id.toString();
				}
			}
		}
		for (var key in this.date) {
			if (this.date[key].isChecked) {
				if(key!="today" && key!="yesterday"&&key!="custom"){
				this.data_filter['start_date'] = this.date[key].from;
				this.data_filter['end_date'] = this.date[key].to;
			}
			else{
				this.data_filter['custom_date'] = this.date[key].to;
			}
			}
		}
		this.navCtrl.setRoot('MapPage', { filter: this.data_filter });
		//this.navCtrl.pop();
	}
	getStatus() {
		var userid = localStorage.getItem('users_data');
		this.filterService.getPin(userid).then((result) => {
			if (result.resCode == 1) {
				this.Status = result.data;
			}
		});
	}
	getUserList() {
		var userid = localStorage.getItem('users_data');
		this.filterService.getUser(userid).then((result) => {
			if (result.resCode == 1) {
				this.assignee = result.data;
			}
		});
	}
 getFirstLastDayOfLastWeek(userDate) {
debugger;
  let result = {};

  let curr = new Date(userDate); // get current date
  let last = (curr.getDate()-1) - curr.getDay(); // First day is the day of the month - the day of the week
  let first = last - 6; // last day is the first day + 6
var firstDay = new Date(curr.setDate(first));
var lastDay = new Date(curr.setDate(last));
  result = {
    firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };

  return result;
};
getFirstLastDayOfthisWeek(userDate) {
debugger;
  let result = {};

  let curr = new Date(userDate); // get current date
  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6
var firstDay = new Date(curr.setDate(first));
var lastDay = new Date(curr.setDate(last));
  result = {
       firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };

  return result;
};
getFirstLastDayOfthisMonth() {
debugger;
  let result = {};
var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);

  result = {
        firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };

  return result;
};
getFirstLastDayOflastMonth() {
debugger;
  let result = {};
var date = new Date(), y = date.getFullYear(), m = date.getMonth()-1;
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);

  result = {
         firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };
  return result;
};
getFirstLastDayOfthisYear() {
debugger;
  let result = {};
var firstDay = new Date(new Date().getFullYear(), 0, 1)
var lastDay = new Date(new Date().getFullYear(), 11, 31)

  result = {
        firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };
  return result;
};
getFirstLastDayOflastYear() {
debugger;
  let result = {};
var firstDay = new Date(new Date().getFullYear()-1, 0, 1)
var lastDay = new Date(new Date().getFullYear()-1, 11, 31)

  result = {
          firstDay:firstDay.getDate+'-'+firstDay.getMonth+'-'+firstDay.getFullYear,
    lastDay:lastDay.getDate+'-'+lastDay.getMonth+'-'+lastDay.getFullYear
  };
  return result;
};
	DateConvert(type: string, isChecked) {
		if (isChecked == true) {
			switch (type) {
				case "todaye":
					this.date.push({ from: '', to: new Date().toString(), isChecked: true, day:type });
					break;
				case "yesterday":
					this.date.push({ from: '', to: (new Date().getDate() - 1).toString(), isChecked: true, day:type });
					break;
				case "thisWeek": {
					let dt = this.getFirstLastDayOfthisWeek(new Date().toString());
					this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type });
					break;
				}
				case "lastWeek": {
					let dt = this.getFirstLastDayOfLastWeek(new Date().toString());
					this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type});
					break;
				}
				case "thisMonth":
					{
						let dt = this.getFirstLastDayOfthisMonth();
						this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type});
						break;
					}
				case "lastMonth":
					{
						let dt = this.getFirstLastDayOflastMonth();
						this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type });
						break;
					}
				case "thisYear":
					{
						let dt = this.getFirstLastDayOfthisYear();
						this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type });
						break;
					}
				case "lastYear":
					{
						let dt = this.getFirstLastDayOflastYear();
						this.date.push({ from: dt['firstday'], to: dt['lastday'], isChecked: true, day:type });
						break;
					}
				default:
					// code...
					break;
			}
		}
		else{
			debugger;
			this.date.forEach(function(value){
				if(value.day==type){
					this.date.splice(value,1);
				}
			})
		}
	}
}
