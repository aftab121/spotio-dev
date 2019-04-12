import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { FilterProvider } from '../../providers/filter/filter';

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
	myDate2:any;
	clear:boolean = false;
	dateFilter = {};
	Status ={};
	assignee = {};
	pindata:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,private calendar: Calendar, public filterService : FilterProvider) {
  	this.Status = {
  		isCustom:false,
		notConnected:false,
		notHome:false,
		notInterested:false,
		lead:false,
		sold:false
  	};
  	this.dateFilter = {
		today:false,
		yesterday:false,
		thisWeek:false,
		lastWeek:false,
		thisMonth:false,
		lastMonth:false,
		thisYear:false,
		lastYear:false
	};
/*	this.assignee =[
		{
			Name : "Avinash singh",
			id : "avi",
			isChecked : false
		},
		{
			Name : "Tauqeer Ahmad",
			id : "taq",
			isChecked : false
		},
		{
			Name : "Shilpa Choudhary",
			id : "shi",
			isChecked : false
		}
	];*/
  	/*this.datePicker.show({
	  date: new Date(),
	  mode: 'date',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => console.log('Got date: ', date),
	  err => console.log('Error occurred while getting date: ', err)
	);*/
	
  }
  todo = {};
  filter:number = 1;
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  ClearSelection(){
 	this.clear = false;
 	let data = this.dateFilter;
 	Object.keys(data).forEach(key=> {
    	this.dateFilter[key] = false;      
	});
	let data1 = this.Status;
 	Object.keys(data1).forEach(key=> {
    	this.Status[key] = false;      
	});
	let data2 = this.assignee;
 	Object.keys(data2).forEach(key=> {
    	this.assignee[key]['isChecked'] = false;      
	});
  }

  LoginRemCheck(data){
  	  	let i = 0;
  	  	Object.keys(data).forEach(key=> {
		    if(data[key] == true){
		    	i++;
		    }      
		});
		if(i > 0){
			this.clear =true;
		}
  }
  changeFilter(val){  	
  	var userid=localStorage.getItem('users_data');
  	if(val==3){
  	this.filterService.getUser(userid).then((result)=>{
  		if(result.resCode==1){
  			this.assignee=result.data;  			
  		}
  	})
  }
  if(val==2){
  	this.filterService.getPin(userid).then((result)=>{
  		if(result.resCode==1){
  			this.pindata=result.data;  			
  		}
  	})
  }
  	this.filter = val;
  }
  goToMap(){
  	this.navCtrl.pop();
  }

}
