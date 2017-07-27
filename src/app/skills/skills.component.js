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
var physics_anim_service_1 = require("./physics-anim.service");
var skills_1 = require("./skillList/skills");
var pre_load_service_1 = require("../backgroundServices/pre-load.service");
var SkillsComponent = (function () {
    function SkillsComponent(pAnimService, preLoadService, router) {
        this.pAnimService = pAnimService;
        this.preLoadService = preLoadService;
        this.router = router;
        this.slideView = "100vw";
    }
    SkillsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = this.preLoadService.matterImagesLoaded();
        this.slideView = "100vw";
        this.viewBoxOpacity = 0;
        this.view = "Legible";
        this.showToggle = 'initial';
        this.skills = skills_1.Skills;
        if (!this.loading) {
            this.subscription = this.preLoadService.matterLoadingUpdate()
                .subscribe(function (loaded) {
                if (loaded)
                    _this.initPhysicsView();
                _this.subscription.unsuscribe();
            });
        }
        else {
            this.initPhysicsView();
        }
        this.router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationStart && _this.pAnimService.enable || _this.pAnimService.pause)
                _this.pAnimService.cancelService();
        });
    };
    SkillsComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    SkillsComponent.prototype.initPhysicsView = function () {
        var _this = this;
        this.pAnimService.enableAnimService(this.skills);
        setTimeout(function () {
            _this.viewBoxOpacity = 1;
        }, 1200);
    };
    SkillsComponent.prototype.alterView = function () {
        var _this = this;
        if (!this.view) {
            this.view = "Legible";
        }
        else if (this.view == "Legible") {
            this.view = "Physics";
            this.pAnimService.pauseAnimService();
        }
        else if (this.view == "Physics") {
            this.view = "Legible";
            this.showToggle = "none";
            setTimeout(function () {
                _this.showToggle = "initial";
                _this.viewBoxOpacity = 0;
            }, 500);
            setTimeout(function () {
                _this.viewBoxOpacity = 1;
            }, 700);
            this.pAnimService.resumeAnimService();
        }
    };
    SkillsComponent.prototype.getCanvasOpacity = function () {
        if (this.view == "Physics")
            return .3;
        else if (this.view == "Legible")
            return 1;
    };
    return SkillsComponent;
}());
SkillsComponent = __decorate([
    core_1.Component({
        selector: 'my-skillsheet',
        template: "\n  \t<canvas id = 'canvas' [style.opacity] = \"getCanvasOpacity()\"></canvas>\n  \t  <div id = 'listWrapper' [ngClass]=\"{enacted:view == 'Physics'}\">\n\t\t  \t<div id = \"listView\">\n\t\t  \t\t<div class = 'legType' *ngFor = \"let skillType of skills\">\n\t\t  \t\t\t<p class = 'pTitle' [ngClass]=\"{'open':skillType.focus}\" (click) = \"skillType.focus = !skillType.focus\">\n\t\t  \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i> <span>{{skillType.type}}</span>\n\t\t  \t\t\t</p>\n\t\t  \t\t\t<div class = 'sUnder' [ngClass] = \"{'revealed':skillType.focus}\">\n\t\t  \t\t\t\t<table class = 'skillTable'>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t\t\t\t<th>Level</th>\n\t\t\t\t\t\t\t<tr *ngFor = \"let entry of skillType.entries\">\n\t\t\t\t\t\t\t\t<td>{{entry.name}}</td>\n\t\t\t\t\t\t\t\t<td>{{entry.level}}</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t  \t\t\t</div>\n\t\t  \t\t</div>\n\t\t  \t\t<div class = 'spacerB'></div>\n\t\t  \t</div>\n\t\t  </div>\n  \t<div id = 'legib' [class.bottom] = \"view != 'Legible'\"[style.opacity] = \"viewBoxOpacity\" [style.display] = \"showToggle\" (click)=\"alterView()\">\n\t\t<p>See {{view}} View</p>\n\t</div>\n  ",
        styleUrls: ['app/skills/skills.component.css']
    }),
    __metadata("design:paramtypes", [physics_anim_service_1.PhysicsAnimService,
        pre_load_service_1.PreLoadService, router_1.Router])
], SkillsComponent);
exports.SkillsComponent = SkillsComponent;
//# sourceMappingURL=skills.component.js.map