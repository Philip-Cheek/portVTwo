"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var projects_1 = require("./projectList/projects");
// <a (click) = 'component.open = !component.open' [ngClass] = "{'open':component.val}">
//             <i class="fa fa-chevron-right"></i> <span class = 'under'>{{component.name}}</span>
//           </a>
var ProjectsComponent = (function () {
    function ProjectsComponent() {
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.projects = projects_1.Projects;
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        selector: 'my-projects',
        template: "\n<div id = 'projectContainer'>\n  <div class = 'projectList' *ngFor = 'let project of projects'>\n    <p class = 'pTitle' (click) = \"project.open = !project.open\" [ngClass]=\"{'open':project.open}\">\n      <i class=\"fa fa-chevron-circle-right\"></i> <span>{{project.name}}</span>\n    </p>\n    <div class = 'projectUnder' [ngClass]=\"{'underOpen':project.open}\">\n      <div id = \"border\"></div>\n      <div class = 'infoLink'>\n        <a  [href] = \"project.photoURL\"><img class = 'first' [src] = \"project.photoURL\"/></a>\n        <a class = 'pSource' [href] = \"project.source\">\n          <i class=\"fa fa-github\"></i> <span class = 'under'>Source Code</span>\n        </a>\n        <a class = 'pSource' *ngIf = \"project.deployment.status\" [href] = \"project.deployment.link\">\n          <i class=\"fa fa-external-link\"></i> <span class = 'under'>{{project.deployment.type}}</span>\n        </a>\n        <div id = 'left'>\n          <p><b>Type:</b> {{project.type}}</p>\n          <p><b>Status:</b> {{project.status}}</p>\n          <p><b>Technology Stack:</b></p>\n          <ul>\n            <li *ngFor = \"let tech of project.stack\">{{tech}}</li>\n          </ul>\n        </div>  \n      </div>\n      <div class = 'bodyText' *ngFor = 'let component of project.components'>\n        <a (click) = 'component.open = !component.open' [ngClass] = \"{'open':component.open}\">\n          <i class=\"fa fa-chevron-right\"></i> <span class = 'under'>{{component.name}}</span>\n        </a>\n        <div class = \"iText\" [ngClass] = \"{'reveal':component.open}\">\n          <div *ngFor = \"let paragraph of component.body\">\n            <p>{{paragraph}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class = \"Spacer\"></div>\n</div>\n  ",
        styleUrls: ['./projects.component.css'],
    })
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map