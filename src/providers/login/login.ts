import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {


  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

   UserLogin(password , email): Promise<any> {


    return new Promise(resolve => {
  		let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        let credentials = JSON.stringify({
            password: password,
            email: email
        });
      var link = 'https://clients.managedcrmsolution.com/public/Api/userLogin';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
		  {
		    resolve(response.json());
		  })
    });
  }

 ChangePassword(oldpassword ,newpassword, userid): Promise<any> {


    return new Promise(resolve => {
      let headers = new Headers( { 'Content-Type' : 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        let credentials = JSON.stringify({
            userid: userid,
            currentpassword: oldpassword,
            newpassword:newpassword
        });
      var link = 'https://clients.managedcrmsolution.com/public/Api/changePassword';
      this.http.post(link , credentials, { headers: headers } ).toPromise()
        .then((response) =>
      {
        resolve(response.json());
      })
    });
  }

}
