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
	channel;
	constructor(public http: Http) {
		var pusher = new Pusher("5db1d26190ce2212007b", {
			cluster: 'us3',
			encrypted: true,
		});
		this.channel = pusher.subscribe('my-channel')
		console.log('Hello PusherServiceProvider Provider');
	}
	public init() {
		console.log('Hello PusherServiceProvider Provider inits');
		return this.channel;
	}
}
