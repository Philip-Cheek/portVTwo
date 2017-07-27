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
var menuList_1 = require("./menu/menuList");
var pre_load_service_1 = require("../backgroundServices/pre-load.service");
var projects_1 = require("../projects/projectList/projects");
var AppComponent = (function () {
    function AppComponent(router, preLoadService) {
        this.router = router;
        this.preLoadService = preLoadService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.projectList = projects_1.Projects;
        this.menu = menuList_1.MenuList;
        this.url = this.router.url;
        this.preLoadService.preLoadMatterImages();
        for (var _i = 0, _a = this.menu; _i < _a.length; _i++) {
            var item = _a[_i];
            item.selected = this.router.url == item.link;
        }
    };
    AppComponent.prototype.style = function () {
        this.url = this.router.url;
        return "url(http://localhost:3000" + this.router.url + "#gradient)";
    };
    AppComponent.prototype.select = function (name) {
        for (var _i = 0, _a = this.menu; _i < _a.length; _i++) {
            var item = _a[_i];
            item.selected = item.name == name;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n  \t<svg version = '1.1' viewBox=\"0 70 386 186\" height=\"100\" width=\"51\" z-index = \"90\" preserveAspectRatio=\"none\">\n      <defs>\n          <linearGradient id=\"gradient\">\n            <stop class=\"stop1\" offset=\"0%\" stop-color=\"#32485d\"/>\n            <stop class=\"stop2\" offset=\"100%\" stop-color=\"#151f28\"/>\n          </linearGradient>\n        </defs>http://localhost:3000/skills\n        <path x=\"0\" y=\"0\" id =\"p\" d=\"M0 0 L0 360 L 190 360 Q90 180 180 0\" z-index = \"90\" [attr.fill] = \"style()\"/>\n\n  </svg>\n\n  \t<div id = \"menu\">\n  \t\t<div id = 'columnBody' *ngFor = \"let item of menu\">\n\t\t\t<span class = 'square' [ngClass] = \"{'selected': item.link == router.url}\">\n\t\t\t\t<a class = 'mItem' (click) = \"select(item.name)\" routerLink= {{item.link}} routerLinkActive=\"active\">\n\t\t\t\t\t{{item.name}}\n\t\t\t\t</a>\n\t\t\t</span><br> \n\t\t\t<div class = 'manualSpacer'></div>\n        <ul *ngIf = \"item.name == 'Projects' && router.url == item.link\">\n          <li *ngFor = \"let project of projectList\" [ngClass] = \"{'subSelect':project.open}\" (click) = \"project.open = !project.open\">\n            <span class = 'bulletText'>{{project.name}}</span>\n          </li>\n        </ul>\n  \t\t</div>\n  \t</div>\n  \t<div id = 'pContainer'>\n  \t\t<router-outlet></router-outlet>\n  \t</div>\n    \n  ",
        styleUrls: ['./app.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, pre_load_service_1.PreLoadService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map