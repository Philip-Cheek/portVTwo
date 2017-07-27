import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PhysicsAnimService } from './physics-anim.service';
import { Skills } from './skillList/skills';
import { SkillType } from './skillList/skillType';
import { PreLoadService } from '../backgroundServices/pre-load.service';



@Component({
  selector: 'my-skillsheet',
  template: `
  	<div id = "wrap">
	  	<canvas id = 'canvas' [style.opacity] = "getCanvasOpacity()"></canvas>
	  	<i id = 'loading' class="fa fa-spinner fa-spin fa-3x fa-fw" *ngIf = "loading"></i>
	  	<p id = "loadText"  *ngIf = "loading">loading</p>

	  	  <div id = 'listWrapper' [ngClass]="{enacted:view == 'Physics'}">
			  	<div id = "listView">
			  		<div class = 'legType' *ngFor = "let skillType of skills">
			  			<p class = 'pTitle' [ngClass]="{'open':skillType.focus}" (click) = "skillType.focus = !skillType.focus">
			  				<i class="fa fa-chevron-circle-right"></i> <span>{{skillType.type}}</span>
			  			</p>
			  			<div class = 'sUnder' [ngClass] = "{'revealed':skillType.focus}">
			  				<table class = 'skillTable'>
								<tr>
									<th>Name</th>
									<th>Level</th>
								<tr *ngFor = "let entry of skillType.entries">
									<td>{{entry.name}}</td>
									<td>{{entry.level}}</td>
								</tr>
							</table>
			  			</div>
			  		</div>
			  		<div class = 'spacerB'></div>
			  	</div>
			  </div>
	  	<div id = 'legib' [class.bottom] = "view != 'Legible'"[style.opacity] = "viewBoxOpacity" [style.display] = "showToggle" (click)="alterView()">
			<p>See {{view}} View</p>
		</div>
	</div>
  `,
  styleUrls: ['./skills.component.css']
})


export class SkillsComponent  { 
	skills:SkillType[];
	view:String;
	viewBoxOpacity:number;
	showToggle:string;
	slideView:string = "100vw";
	loading:boolean;
	subscription:any;

	constructor(private pAnimService: PhysicsAnimService,
		private preLoadService: PreLoadService, private router: Router) {

	}

	ngOnInit(){
		this.loading = !this.preLoadService.matterImagesLoaded();
		this.slideView = "100vw";
		this.viewBoxOpacity = 0;
		this.view = "Legible";
		this.showToggle = 'initial';
		this.skills = Skills;

		if (this.loading){
		   this.subscription = this.preLoadService.matterLoadingUpdate()
				.subscribe((loaded)=>{
					if (loaded)
						this.loading = false;
						this.initPhysicsView();
						this.subscription.unsuscribe();
				});
		}else{
			this.initPhysicsView();
		}

		this.router.events.subscribe((e) => {
			if (e instanceof NavigationStart && this.pAnimService.enable || this.pAnimService.pause)
				this.pAnimService.cancelService();
		});
	}

	ngOnDestroy(){
		if (this.subscription)
			this.subscription.unsubscribe();
	}
	
	initPhysicsView(){
		this.pAnimService.enableAnimService(this.skills);
		setTimeout(()=>{
			this.viewBoxOpacity = 1;
		}, 1200);
	}

	alterView(){
		if (!this.view){
			this.view = "Legible";
		}else if (this.view == "Legible"){
			this.view = "Physics";
			this.pAnimService.pauseAnimService();
		}else if (this.view == "Physics"){
			this.view = "Legible";
			this.showToggle = "none";
			setTimeout(()=>{
				this.showToggle = "initial";
				this.viewBoxOpacity = 0;
			}, 500); setTimeout(()=>{ 
				this.viewBoxOpacity = 1 
			},700);

			this.pAnimService.resumeAnimService();
		}
	}

	getCanvasOpacity():number{
		if (this.view == "Physics")
			return .3;
		else if (this.view == "Legible")
			return 1;
	}
}