import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Contact } from './contact';
import { contactInfo } from './contactInfo';
import { MessageInfo } from './messageInfo';



@Component({
  selector: 'my-contact',
  template: `
  	<div id = "backgroundContact" [ngClass] = "{'init':init}"></div>
  	<div id = 'contactWrapper'>
		<p class = 'pTitle' (click) = 'info = !info' [ngClass] = "{'open':info}">
			<i class="fa fa-chevron-circle-right"></i>  <span>Contact Info</span>
		</p>
		<div id = 'cInfo' class = 'sUnder' [ngClass] = "{'underOpen':info}">
		    <div class = "border"></div>
			<p *ngFor = "let info of contact">
				<b><i [ngClass] = "info.css"></i> {{info.name}}:</b> {{info.content}}
			</p>
		</div>
		<br>
		<p class = 'pTitle' (click) = "field = !field" [ngClass] = "{'open':field}">
			<i [ngClass] = "{'open':field}" class="fa fa-chevron-circle-right"></i>  <span>Contact Field</span>
		</p>

		<div id = 'cField' class = 'sUnder' [ngClass] = "{'underOpen': field}">
			<form>
			<div class = "border"></div>
			<p class = "erText">
			<span *ngIf = "blank">Fields Left Blank </span><span *ngIf = "error && blank">& </span><span *ngIf = "error">Invalid Email</span>
			</p>
			<table>
				<tr>
					<td>Name: </td>
					<td><input type = 'textField' [ngClass] = "{'blank':blank && messageInfo.name.length == 0}" [(ngModel)] = "messageInfo.name"[ngModelOptions]="{standalone: true}" (ngModelChange)="checkBlank()"></td>
				</tr>
				<tr>
					<td>Email: </td>
					<td><input type = 'textField' [ngClass] = "{'blank':error || (blank && messageInfo.email.length == 0)}"[(ngModel)] = "messageInfo.email" [ngModelOptions]="{standalone: true}" (ngModelChange)="validEmail()" (blur) = "validEmail(true)"></td>
				</tr>
			</table>
			
			<div id = 'message'>
				<textarea [ngClass] = "{'blank':blank && messageInfo.message.length == 0}" [(ngModel)] = "messageInfo.message" [ngModelOptions]="{standalone: true}" (ngModelChange)="checkBlank()"></textarea>
				<p>Message:</p>
			</div>

			<button *ngIf = "!sent" (click) = "submitMessage()">Send</button>
			<div id = 'restore'>
				<p class = 'thanks' *ngIf = "sent">Thanks! I'm excited to hear from you!</p>
				<button id = 'restore' *ngIf = "sent" (click) = "sent = false">
					<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
				</button>
			</div>
			</form>
		</div>
	</div>
  `,
  styleUrls: ['./contact.component.css']
})


export class ContactComponent  { 
	email:string;
	sent: boolean;
	response: boolean;
	info:boolean;
	field:boolean;
	error:boolean;
	init:boolean;
	blank:boolean;
	initSun:boolean;
	private CSRF:any;
	private XSRF:any;
	messageInfo:MessageInfo;
	contact:Contact[];

	 constructor(private http: Http, private zone: NgZone) {}

	
	ngOnInit():void{
		if (!this.messageInfo)
			this.messageInfo = new MessageInfo();
		this.init = false;
		this.blank = false;
		this.contact = contactInfo;
		this.response = false;
		this.info = true;
		this.field = true;
		this.error = false;
		this.sent = false;
		this.initSun = false;

		this.zone.runOutsideAngular(()=>{
			const cookies:string[] = document.cookie.toString().split("; ");
			for (let i = 0; i < cookies.length; i++){
				let kPair = cookies[i].split("=");
				if (kPair[0] == "_csrf"){
					this.CSRF = kPair[1]; 
				}else if (kPair[0] == "csrf-token"){
					this.XSRF = kPair[1];
				}
			}
		});
	}

	alterInfo():void{
		this.info = !this.info;
	}

	checkBlank(goForth:boolean){
		if (goForth || this.blank){
			this.blank = this.messageInfo.name.length == 0 ||
			 this.messageInfo.name.length == 0 || this.messageInfo.message.length == 0;
		}
	}

	submitMessage(){
		this.checkBlank(true);

		if (!this.error && !this.blank){
			const headers:Headers = new Headers();
  			headers.append('Content-Type', 'application/json');
  			headers.append('X-CSRF-Token', this.XSRF);
  			const data:any = {
  				"name": this.messageInfo.name,
  				"email": this.messageInfo.email,
  				"message": this.messageInfo.message
  			}

  			let options = new RequestOptions({'headers': headers, withCredentials:true});
  			 console.log(options);

  			this.http.post('/sendMail', data, options)
  				.subscribe( (resp: any) => {
  					console.log(resp);
  					if (resp.status){
  						console.log("WHOOHOO");
  					}
  				}
  			);
			this.sent = true;
		}
	}

	validEmail(goForth:boolean) {
		if (!this.error && !goForth){
			return
		}else if (this.messageInfo.email.length == 0){
			this.error = false;
		}else{
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    	this.error = !re.test(this.messageInfo.email);
		}
	}
}