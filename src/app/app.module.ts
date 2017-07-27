import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MouseAnimService }     from './home/mouse-anim.service';
import { PhysicsAnimService }     from './skills/physics-anim.service';
import { PreLoadService }     from './backgroundServices/pre-load.service';

import { AppComponent } from './appMain/app.component';
import { TitleComponent }  from './home/title.component';
import { SkillsComponent }  from './skills/skills.component';
import { ProjectsComponent }  from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


import { AppRoutingModule } from './routing/app-routing.module';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	AppRoutingModule,
    FormsModule,
    HttpModule
   ],
  declarations: [
   AppComponent,
   TitleComponent,
   SkillsComponent,
   ProjectsComponent,
   ContactComponent,
   AboutComponent
   ],
  providers: [ MouseAnimService, PhysicsAnimService, PreLoadService, ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
