"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var mouse_anim_service_1 = require("./home/mouse-anim.service");
var physics_anim_service_1 = require("./skills/physics-anim.service");
var pre_load_service_1 = require("./backgroundServices/pre-load.service");
var app_component_1 = require("./appMain/app.component");
var title_component_1 = require("./home/title.component");
var skills_component_1 = require("./skills/skills.component");
var projects_component_1 = require("./projects/projects.component");
var contact_component_1 = require("./contact/contact.component");
var about_component_1 = require("./about/about.component");
var app_routing_module_1 = require("./routing/app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            title_component_1.TitleComponent,
            skills_component_1.SkillsComponent,
            projects_component_1.ProjectsComponent,
            contact_component_1.ContactComponent,
            about_component_1.AboutComponent
        ],
        providers: [mouse_anim_service_1.MouseAnimService, physics_anim_service_1.PhysicsAnimService, pre_load_service_1.PreLoadService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map