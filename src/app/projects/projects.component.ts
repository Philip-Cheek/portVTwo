import { Component, OnInit } from '@angular/core';
import {Projects} from './projectList/projects';
import {Project} from './projectList/project';

// <a (click) = 'component.open = !component.open' [ngClass] = "{'open':component.val}">
//             <i class="fa fa-chevron-right"></i> <span class = 'under'>{{component.name}}</span>
//           </a>


@Component({
  selector: 'my-projects',
  template: `
<div id = 'projectContainer'>
  <div class = 'projectList' *ngFor = 'let project of projects'>
    <p class = 'pTitle' (click) = "project.open = !project.open" [ngClass]="{'open':project.open}">
      <i class="fa fa-chevron-circle-right"></i> <span>{{project.name}}</span>
    </p>
    <div class = 'projectUnder' [ngClass]="{'underOpen':project.open}">
      <div id = "border"></div>
      <div class = 'infoLink'>
        <a  [href] = "project.photoURL"><img class = 'first' [src] = "project.photoURL"/></a>
        <a class = 'pSource' [href] = "project.source">
          <i class="fa fa-github"></i> <span class = 'under'>Source Code</span>
        </a>
        <a class = 'pSource' *ngIf = "project.deployment.status" [href] = "project.deployment.link">
          <i class="fa fa-external-link"></i> <span class = 'under'>{{project.deployment.type}}</span>
        </a>
        <div id = 'left'>
          <p><b>Type:</b> {{project.type}}</p>
          <p><b>Status:</b> {{project.status}}</p>
          <p><b>Technology Stack:</b></p>
          <ul>
            <li *ngFor = "let tech of project.stack">{{tech}}</li>
          </ul>
        </div>  
      </div>
      <div class = 'bodyText' *ngFor = 'let component of project.components'>
        <a (click) = 'component.open = !component.open' [ngClass] = "{'open':component.open}">
          <i class="fa fa-chevron-right"></i> <span class = 'under'>{{component.name}}</span>
        </a>
        <div class = "iText" [ngClass] = "{'reveal':component.open}">
          <div *ngFor = "let paragraph of component.body">
            <p>{{paragraph}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class = "Spacer"></div>
</div>
  `,
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent{
  projects:Project[];

  ngOnInit():void{
  	this.projects = Projects;
  }

}