import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: Http) {
    console.log('Hello ChatProvider Provider');
  }
   chatList(userid): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
			 user_id: userid
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/getChatUserList';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
     loadIndividualMessage(senderid,receiverid): Promise<any> {
 	debugger
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
				s:senderid,
				 r: receiverid,
				 html : "false"
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/getMessages';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
   sendMessage(senderid,receiverid,msg): Promise<any> {
 
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
				 sender_id:senderid,
				 reciever_id: receiverid,
				 msg : msg
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/sendApiMessage';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
     DeleteMessage(uid,mid,rcv_id): Promise<any> {
	 return new Promise(resolve => {
		 let headers = new Headers({ 'Content-Type': 'application/json' });
		 let options = new RequestOptions({ headers: headers });
		 let credentials = JSON.stringify({
				 uid:uid,
				 mid: mid,
				 rid:rcv_id
		 });
		 var link = 'https://clients.managedcrmsolution.com/public/Api/deleteMessage';
		 this.http.post(link, credentials, { headers: headers }).toPromise()
			 .then((response) => {
				 resolve(response.json());
			 })
	 });
  }
}
