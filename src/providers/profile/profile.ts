import { Http, Headers, RequestOptions } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }
  getProfile(userid): Promise<any> {
  	return new Promise(resolve => {
  		let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        let credentials = JSON.stringify({
            userid: userid
        });
      var link = 'https://clients.managedcrmsolution.com/public/Api/getProfile';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
		  {
		    resolve(response.json());
		  })
    });
  }

}
