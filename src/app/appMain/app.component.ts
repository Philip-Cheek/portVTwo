import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu/menuItem';
import { MenuList } from './menu/menuList';
import { PreLoadService } from '../backgroundServices/pre-load.service';
import { Project } from '../projects/projectList/project';
import { Projects } from '../projects/projectList/projects';



@Component({
  selector: 'my-app',
  template: `
    <svg version = '1.1' viewBox="0 70 386 186" height="100" width="51" z-index = "90" preserveAspectRatio="none">
      <defs>
          <linearGradient id="gradient">
            <stop class="stop1" offset="0%" stop-color="#32485d"/>
            <stop class="stop2" offset="100%" stop-color="#151f28"/>
          </linearGradient>
        </defs>
        <path x="0" y="0" id ="p" d="M0 0 L0 360 L 190 360 Q90 180 180 0" z-index = "90" [attr.fill] = "style()"/>

  </svg>

    <div id = "menu" [ngClass] = "{'adjustSelect':router.url == '/projects'}">
      <div id = 'columnBody' *ngFor = "let item of menu">
      <span class = 'square' [ngClass] = "{'selected': item.link == router.url}">
        <a class = 'mItem' (click) = "select(item.name)" routerLink= {{item.link}} routerLinkActive="active">
          {{item.name}}
        </a>
      </span><br> 
      <div class = 'manualSpacer'></div>
        <ul *ngIf = "item.name == 'Projects' && router.url == item.link">
          <li *ngFor = "let project of projectList" [ngClass] = "{'subSelect':project.open}" (click) = "project.open = !project.open">
            <span class = 'bulletText'>{{project.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div id = 'pContainer'>
      <router-outlet></router-outlet>
    </div>
    
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  menu:MenuItem[];
  url:string;
  sublist:string[];
  projectList:Project[];

  constructor(private router:Router, private preLoadService:PreLoadService) {}

  ngOnInit():void{
    this.projectList = Projects;
    this.menu = MenuList;
    this.url = this.router.url;
    this.preLoadService.preLoadMatterImages();
    for (let item of this.menu)
      item.selected = this.router.url == item.link;
  }

  style():string{
    this.url = this.router.url;
    return "url(http://localhost:3000" + this.router.url + "#gradient)";
  }

  select(name:string):void{
    for (let item of this.menu)
      item.selected = item.name == name;
  }

}