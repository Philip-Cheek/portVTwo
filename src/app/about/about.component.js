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
var router_1 = require("@angular/router");
var AboutComponent = (function () {
    function AboutComponent(router) {
        this.router = router;
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'my-about',
        template: "\n  \t<div id = 'about'>\n\t<div id = 'aWrap'>\n\t\t<p>My name is Philip Cheek. I am 23 years old and I currently live in the Bay Area. My primary technical interests involve both the backend and frontend development of Web Applications. I am passionate about utilizing new technologies and building tools of my own to deliver secure, fresh, and innovative experiences to end users.</p>\n\t\t<p>In addition, I am also merging my love for web development with a budding interest in game development, as I am currently developing an isometric multiplayer browser game. Once the project reaches completion, I hope to take the engine and tools that I am building and spin them into multi-purpose utilities to be made available to other broswer game devs should they find them useful.</p>\n\t\t<p>I have always bore an obsession with technology and have fed my passion through both programming and learning about new technologies, design patterns, data structures, and emerging fields.</p>\n\t\t<p>Please visit my <a routerLink = \"/contact\" routerLinkActive=\"active\">contact page</a> and send me a note if you would like to either work with me or ask my any questions.</p>\n\t</div>\n\t<h1>About Me</h1>\n</div>\n  ",
        styleUrls: ['app/about/about.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map