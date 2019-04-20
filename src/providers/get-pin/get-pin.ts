import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

/*
  Generated class for the GetPinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetPinProvider {

   constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  GetPinList(UserId, current = '1', pin_status, assigned_to, start_date, custom_date, end_date): Promise<any> {

    debugger;
    return new Promise(resolve => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let credentials = JSON.stringify({
        userid: UserId,
        assigned_to: assigned_to,
        status: pin_status,
        start_date: start_date,
        end_date: end_date,
        custom: custom_date
      });
      var link = 'https://clients.managedcrmsolution.com/public/Api/GetMarkerList?page=' + current;
      this.http.post(link, credentials, { headers: headers }).toPromise()
        .then((response) => {
          resolve(response.json());
        })
    });
  }


  GetPinCount(UserId): Promise<any> {


    return new Promise(resolve => {
  		let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        let credentials = JSON.stringify({
            userid : UserId
        });
      var link = 'https://clients.managedcrmsolution.com/public/Api/displayPinsCount';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
		  {
		    resolve(response.json());
		  })
    });
  }


}
