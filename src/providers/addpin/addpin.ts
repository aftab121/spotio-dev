import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AddpinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddpinProvider {

  constructor(public http: Http) {
    console.log('Hello AddpinProvider Provider');
  }
  
  createAddPin(userid): Promise<any> {
  	return new Promise(resolve => {
  		let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        let credentials = JSON.stringify({
            userid: userid
        });
      var link = 'https://clients.managedcrmsolution.com/public/Api/dynamicInputs';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
		  {
		    resolve(response.json());
		  })
    });
  }
  AddMarker(credentials): Promise<any> {
    debugger
    return new Promise(resolve => {
      let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 
      var link = 'https://clients.managedcrmsolution.com/public/Api/AddMarker';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
      {
        resolve(response.json());
      })
    });
  }
  EditPin(userid,id): Promise<any> {
    return new Promise(resolve => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let credentials = JSON.stringify({
        userid: userid,
        pin_id: id
      });
      var link = 'https://clients.managedcrmsolution.com/public/Api/GetPinDetail';
      this.http.post(link, credentials, { headers: headers }).toPromise()
        .then((response) => {
          resolve(response.json());
        });
    });
  }
}
