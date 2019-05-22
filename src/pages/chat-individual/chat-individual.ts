import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { PusherServiceProvider } from'../../providers/pusher-service/pusher-service';
import { Content } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';


/**
 * Generated class for the ChatIndividualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-chat-individual',
	templateUrl: 'chat-individual.html',
})
export class ChatIndividualPage {
	@ViewChild("Content") content: Content;
	@ViewChild('msgBox') chatBoxElement: HTMLInputElement;
	@ViewChild('unchecked') messageElement: HTMLInputElement;
	model: any;
	//messages:Array<{id:string,reciever_id:string,sender_id:string,message:string,status:string,created_at:string,updated_at:string}>;
	messages: any = [];
	send_status: boolean = false;
	lastData: string = "";
	constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatProvider, public pusherService: PusherServiceProvider) {
		this.model = navParams.data['details'];
	}

	ionViewDidLoad() {
	
		setTimeout(() => {
			this.content.scrollToBottom(300);
		}, 1000);
		/*console.log('ionViewDidLoad ChatIndividualPage');*/
		var userid = localStorage.getItem('users_data');
		this.chatService.loadIndividualMessage(userid, this.model.id).then((result) => {
			if (result.ResCode == 102) {
				this.messages = result.ResData;
				var group_to_values = result.ResData.reduce(function(obj, item) {
					var created_date = new Date(item.created_at).toDateString();
					var time = new Date(item.created_at).toTimeString().substr(0, 5);

					obj[created_date] = obj[created_date] || [];
					obj[created_date].push({
						id: item.id,
						reciever_id: item.reciever_id,
						sender_id: item.sender_id,
						message: item.message,
						status: '',
						created_at: item.created_at,
						time: time,
						updated_at: item.updated_at,
						selected:false
					});
					return obj;
				}, {});

				this.messages = Object.keys(group_to_values).map(function(key) {
					return { created_date: key, list: group_to_values[key] };
				});
				console.log(this.messages);
			}
			else {
				alert(result.ResMsg)
			}
		}, (error) => {
			console.log('error', JSON.stringify(error));
		});
		this.pusher();
	}
	pusher() {
		var userid = localStorage.getItem('users_data');
		const channel = this.pusherService.init();
		channel.bind('userBox_' + userid, (data) => {
			var created_date = new Date(data.Time).toDateString();
			var time = new Date(data.Time).toTimeString().substr(0, 5);
			/*var filter=this.messages.filter(function(){

			})*/
			var last = this.messages[this.messages.length - 1];


			if (last.created_date == created_date) {
				this.messages[this.messages.length - 1].list.push({
					id: data.MessageId,
					reciever_id: userid,
					sender_id: data.Chatbox,
					message: data.Message,
					status: '',
					created_at: data.Time,
					time: time,
					updated_at: data.Time,
					selected:false
				});
			}
			else {
				this.messages.push({
					created_date: created_date, list: [{
						id: data.MessageId,
						reciever_id: userid,
						sender_id: data.Chatbox,
						message: data.Message,
						status: '',
						created_at: data.Time,
						time: time,
						updated_at: data.Time,
						selected:false
					}]
				});
			}

			setTimeout(() => {
				this.content.scrollToBottom(300);
			}, 1000);
		}, (error) => {
			console.log(JSON.stringify(error));
		});


		channel.bind('DeletedMessage_'+userid,(data)=>{
				debugger;
					var mid=data['MessageId'];
					this.messages.forEach(function(item,key,arr) {					
					var data = item.list.findIndex(i => i.id == mid);
					if (data > -1) {
						item.list.splice(data, 1);	
						if(item.list.length==0){
							arr.splice(key,1);
						}					
					}

				});
			},(error)=>{
				console.log(JSON.stringify(error));
			})
	}
	getdate(date) {
		var currentDate = new Date().toString();
		var dt = new Date(date).toString();
		if (currentDate.match(dt)) {
			return "Today";
		}
		else {
			return dt;
		}
	}
	getTime(dateTime) {
		var dt = new Date(dateTime).getHours() + ":" + new Date(dateTime).getMinutes();
		return dt;
	}
	sendMessage(rcv_id) {
		var userid = localStorage.getItem('users_data');
		if (this.send_status == false && this.chatBoxElement.value != "") {
			this.send_status = true;
			this.chatService.sendMessage(userid, rcv_id, this.chatBoxElement.value).then((result) => {
				if (result.ResCode == 102) {
					this.send_status = false;
					this.chatBoxElement.value = "";
					var created_date = new Date(result.ResData.time).toDateString();
					var time = new Date(result.ResData.time).toTimeString().substr(0, 5);
				
					var last = this.messages[this.messages.length - 1];


					if (last.created_date == created_date) {
						this.messages[this.messages.length - 1].list.push({
							id: result.ResData.msgID,
							reciever_id: rcv_id,
							sender_id: userid,
							message: result.ResData.msg,
							status: '',
							created_at: result.ResData.time,
							time: time,
							updated_at: result.ResData.time,
							selected:false
						});
					}
					else {
						this.messages.push({
							created_date: created_date, list: [{
								id: result.ResData.msgID,
								reciever_id: rcv_id,
								sender_id: userid,
								message: result.ResData.msg,
								status: '',
								created_at: result.ResData.time,
								time: time,
								updated_at: result.ResData.time,
								selected:false
							}]
						});
					}


					setTimeout(() => {
						this.content.scrollToBottom(300);
					}, 1000);
				}
				else {
					alert(result.ResMsg)
				}
			}, (error) => {
				console.log('error', JSON.stringify(error));
			});
		}

	}
	back() {
		this.navCtrl.setRoot(MapPage)
	}
	itemSelected(i,obj,msg){
		debugger;
		this.messages.forEach(function(item){
			var data = item.list.findIndex(i => i.selected == true);
			if(data>-1){
				item.list.map(i => i.selected = false);
			}
		})
		this.messages[i]["list"][obj].selected=true;		
	}
	deleteMessage(mid, rcv_id) {
		var userid = localStorage.getItem('users_data');

		this.chatService.DeleteMessage(userid, mid, rcv_id).then((result) => {
			if (result.ResCode == 102) {
				this.messages.forEach(function(item,key,arr) {
					var data = item.list.findIndex(i => i.id == mid);
					if (data > -1) {
						item.list.splice(data, 1);	
						if(item.list.length==0){
							arr.splice(key,1);
						}					
					}

				});
				console.log("deleted");
			}
		}, (error) => {
			console.log('error', JSON.stringify(error));
		});
	}

}
