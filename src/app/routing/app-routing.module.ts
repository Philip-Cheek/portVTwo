import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TitleComponent } from '../home/title.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent }  from '../projects/projects.component';
import { ContactComponent }  from '../contact/contact.component';
import { AboutComponent }  from '../about/about.component';





const routes: Routes = [
  { path: '',  component: TitleComponent },
  { path: 'skills', component: SkillsComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}