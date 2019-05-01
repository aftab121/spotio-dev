import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppointmentProvider {

  constructor(public http: Http) {
    console.log('Hello AppointmentProvider Provider');
  }
 createAppointment(data:any): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
			 userid: data.userid,
			 pin_id: data.pin_id,
			 pin_name: data.pin_name,
			 pin_status: data.pin_status_id,
			 location: data.location,
			 start_date: data.startDate,
			 end_date: data.endDate,
			 notes: data.note
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/addAppointment';
		 this.http.post(link, data, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
   appointmentList(userid): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
			 userid: userid
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/appointmentList';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
   editAppointment(id,userid): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
			 userid: userid,
			 appointment_id:id
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/getAppointmentDetail';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
    UpdateAppointment(data:any): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
			data
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/editAppointmentInfo';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
}
