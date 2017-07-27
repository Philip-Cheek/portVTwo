"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var contactInfo_1 = require("./contactInfo");
var messageInfo_1 = require("./messageInfo");
var ContactComponent = (function () {
    function ContactComponent(http) {
        this.http = http;
    }
    ContactComponent.prototype.ngOnInit = function () {
        if (!this.messageInfo)
            this.messageInfo = new messageInfo_1.MessageInfo();
        this.init = false;
        this.blank = false;
        this.contact = contactInfo_1.contactInfo;
        this.response = false;
        this.info = true;
        this.field = true;
        this.error = false;
        this.sent = false;
        this.initSun = false;
    };
    ContactComponent.prototype.alterInfo = function () {
        this.info = !this.info;
    };
    ContactComponent.prototype.checkBlank = function (goForth) {
        if (goForth || this.blank) {
            this.blank = this.messageInfo.name.length == 0 ||
                this.messageInfo.name.length == 0 || this.messageInfo.message.length == 0;
        }
    };
    ContactComponent.prototype.submitMessage = function () {
        this.checkBlank(true);
        if (!this.error && !this.blank) {
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var data = {
                "name": this.messageInfo.name,
                "email": this.messageInfo.email,
                "message": this.messageInfo.message
            };
            this.http.post('/api/user/email', data, { 'headers': headers })
                .subscribe(function (resp) {
                if (resp.sucessful) {
                    console.log("WHOOHOO");
                }
            });
            this.sent = true;
        }
    };
    ContactComponent.prototype.validEmail = function (goForth) {
        if (!this.error && !goForth) {
            return;
        }
        else if (this.messageInfo.email.length == 0) {
            this.error = false;
        }
        else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.error = !re.test(this.messageInfo.email);
        }
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        template: "\n  \t<div id = \"backgroundContact\" [ngClass] = \"{'init':init}\"></div>\n  \t<div id = 'contactWrapper'>\n\t\t<p class = 'pTitle' (click) = 'info = !info' [ngClass] = \"{'open':info}\">\n\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>  <span>Contact Info</span>\n\t\t</p>\n\t\t<div id = 'cInfo' class = 'sUnder' [ngClass] = \"{'underOpen':info}\">\n\t\t    <div class = \"border\"></div>\n\t\t\t<p *ngFor = \"let info of contact\">\n\t\t\t\t<b><i [ngClass] = \"info.css\"></i> {{info.name}}:</b> {{info.content}}\n\t\t\t</p>\n\t\t</div>\n\t\t<br>\n\t\t<p class = 'pTitle' (click) = \"field = !field\" [ngClass] = \"{'open':field}\">\n\t\t\t<i [ngClass] = \"{'open':field}\" class=\"fa fa-chevron-circle-right\"></i>  <span>Contact Field</span>\n\t\t</p>\n\n\t\t<div id = 'cField' class = 'sUnder' [ngClass] = \"{'underOpen': field}\">\n\t\t\t<div class = \"border\"></div>\n\t\t\t<p class = \"erText\">\n\t\t\t<span *ngIf = \"blank\">Fields Left Blank </span><span *ngIf = \"error && blank\">& </span><span *ngIf = \"error\">Invalid Email</span>\n\t\t\t</p>\n\t\t\t<table>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Name: </td>\n\t\t\t\t\t<td><input type = 'textField' [ngClass] = \"{'blank':blank && messageInfo.name.length == 0}\" [(ngModel)] = \"messageInfo.name\" (ngModelChange)=\"checkBlank()\"></td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td>Email: </td>\n\t\t\t\t\t<td><input type = 'textField' [ngClass] = \"{'blank':error || (blank && messageInfo.email.length == 0)}\"[(ngModel)] = \"messageInfo.email\" (ngModelChange)=\"validEmail()\" (blur) = \"validEmail(true)\"></td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t\n\t\t\t<div id = 'message'>\n\t\t\t\t<textarea [ngClass] = \"{'blank':blank && messageInfo.message.length == 0}\" [(ngModel)] = \"messageInfo.message\" (ngModelChange)=\"checkBlank()\"></textarea>\n\t\t\t\t<p>Message:</p>\n\t\t\t</div>\n\n\t\t\t<button *ngIf = \"!sent\" (click) = \"submitMessage()\">Send</button>\n\t\t\t<div id = 'restore'>\n\t\t\t\t<p class = 'thanks' *ngIf = \"sent\">Thanks! I'm excited to hear from you!</p>\n\t\t\t\t<button id = 'restore' *ngIf = \"sent\" (click) = \"sent = false\">\n\t\t\t\t\t<i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n  ",
        styleUrls: ['app/contact/contact.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map