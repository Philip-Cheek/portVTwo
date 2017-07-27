import { Injectable, NgZone } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { PhConfig } from '../skills/skillList/PhConfig';
import { Skill } from '../skills/skillList/Skill';
import { Skills } from '../skills/skillList/skills';
import { Subject } from 'rxjs/Subject';


declare type Callback = () => any;

@Injectable()
export class PreLoadService {
	matterImages:HTMLImageElement[];
	matterCounter:number = 0;
	private matterLoaded:Subject<any> = new Subject<any>();

	preLoadMatterImages():void{
		if (!this.matterImages) this.matterImages = [];

		for (let skillType of Skills){
      		for (let skill of skillType.entries){
        		let p:PhConfig = skill.physics;
        		if (p.t != 'none'){
        			let tUrl = 'https://s3.amazonaws.com/prosepair/' + p.n + '.png';
        			this.loadImage(tUrl, ()=>{
        				this.matterCounter++;
        				if (this.matterImagesLoaded()){
        					this.matterLoaded.next(true);
        				}
        			})
        		}
      		}
    	}
	}

	matterLoadingUpdate():Observable<any>{
		return this.matterLoaded.asObservable();
	}	

	matterImagesLoaded():boolean{
		return this.matterCounter == this.matterImages.length;
	}

	loadImage(url:string, callback:Callback):void{
        try {
            let img = new Image();
            img.src = url;

            if (img.complete)
            	callback();
            else
            	img.onload = callback;

            this.matterImages.push(img);
        } catch (e) { 
        	console.log(e);
        }
	}

	

}