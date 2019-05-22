import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const Pusher: any;
/*
  Generated class for the PusherServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PusherServiceProvider {
	channel:any="";	
	key:any="";
	cluster:any="";
	constructor(public http: Http) {
		var data=this.getPusherCredential().then((result)=>{			
			this.channel=result["channel"];
			this.key=result["key"];
			this.cluster=result["cluster"];
		});
		
		/*this.channel = pusher.subscribe('my-channel');*/
		

	}
	public init() {		
		var pusher = new Pusher(this.key, {
			cluster: this.cluster,
			encrypted: true,
		});
		this.channel = pusher.subscribe(this.channel);
		return this.channel;
	}
	/*public chat() {
		return this.channel;
	}*/
	getPusherCredential(): Promise<any> {
		return new Promise(resolve => {
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });
			var link = 'http://clients.managedcrmsolution.com/public/GetPusherKey';
			this.http.get(link, { headers: headers }).toPromise()
				.then((response) => {
					resolve(response.json());
				})
		});
	}
}
