import { Injectable, NgZone } from '@angular/core';
import {SkillType} from './skillList/skillType';
import {PhConfig} from './skillList/PhConfig';

declare var Matter:any;

@Injectable()
export class PhysicsAnimService {

	matter:any;
	engine:any;
	world:any;
	borders:any[];
	scale:number;
	render:any;
	walls:Object[];
  mouse:any;
  mStyle:string;
  sizeDown:boolean;
  sizeUp:boolean;
  cWidth:number;
  cHeight:number;
  promise:any;
  events:Object;
  sRate:number;
  bridge:any;
  constraint:any;
  enable:boolean;
  pause:boolean;

	constructor(private zone: NgZone){};

	enableAnimService(skills:SkillType[], sRate:number = 1000):void{
    this.enable = true;
    this.events = {};
		this.zone.runOutsideAngular(()=>{
		  let canvas = <HTMLCanvasElement>document.getElementById('canvas'),
				  context:CanvasRenderingContext2D = canvas.getContext('2d');

			const width:number = document.getElementById('pContainer').offsetWidth,
				    height:number = document.getElementById('pContainer').offsetHeight;

      this.sRate = sRate;
      this.matter = Matter;
			this.setRender(canvas, context, width, height);
			this.setWorld();
			this.addWalls(width, height);
      this.addBridge(skills);
      this.addSkills(skills);
      this.cWidth = width;
      this.addResizeHandler();

			this.events['u'] = window.requestAnimationFrame(this.update.bind(this));
		});
	}

  update():void{
    if (this.pause)
      window.document.body.style.cursor = "initial";
    if (!this.enable) return;
    this.events['u'] = window.requestAnimationFrame(this.update.bind(this));
    
    let canvas = <HTMLCanvasElement>document.getElementById('canvas'),
        context:CanvasRenderingContext2D = canvas.getContext('2d');

    const w:number = document.getElementById('pContainer').offsetWidth,
          h:number = document.getElementById('pContainer').offsetHeight,
          scale = w/this.sRate; canvas.height = h; canvas.width = w;

    this.scaleWalls(w, h, scale);
    this.render.context.scale(scale, scale);
    this.matter.Mouse.setScale(this.render.mouse, {x:1/scale, y:1/scale});
    this.detectMouseCollision()
    this.matter.Render.world(this.render);

    if (!this.sizeDown && !this.sizeUp)
      this.matter.Engine.update(this.engine);
    else if (this.sizeUp)
      this.adjustHeight(scale);
  }

  pauseAnimService(){
    this.enable = false;
    this.pause = true;
  }

  resumeAnimService(){
    this.enable = true;
    this.pause = false;
    this.zone.runOutsideAngular(()=>{
      this.events['u'] = window.requestAnimationFrame(this.update.bind(this));
    });
  }
	
  addResizeHandler():void{
    this.events['r'] = this.handleResize.bind(this);
    window.addEventListener('resize',this.events['r'],true);
  }

  handleResize():void{
    if (this.promise) clearTimeout(this.promise);
    if (!this.enable) return;

    const w:number = document.getElementById('pContainer').offsetWidth;

    this.sizeDown = w < this.cWidth;
    this.sizeUp = !this.sizeDown;
    this.cWidth = w;

    this.promise = setTimeout(() => {
      this.sizeUp = false;
      this.sizeDown = false;
    }, 300);
  }

	setRender(c:HTMLCanvasElement, ctx:CanvasRenderingContext2D, w:number, h:number):void{
		c.width = w;
		c.height = h;
		this.engine = this.matter.Engine.create();
		this.render = this.matter.Render.create({
  		canvas: c,
  		context: ctx,
  		engine: this.engine,
  		options: {
    		width: w,
    		height: h,
    		background: 'none',
    		showAngleIndicator: false,
    		wireframes: false
  		}
		});
	}

  detectMouseCollision():void{
    if (this.mStyle == "grabbing") return;

    const bodies:any[] = this.matter.Composite.allBodies(this.world),
          mouseVector:any = this.render.mouse.position,
          col:any[] = this.matter.Query.point(bodies, mouseVector);
    if (col.length > 0){
      let fFox:boolean = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      document.body.style.cursor = fFox ? "grab":"-webkit-grab";
      this.mStyle = "grab";
    }else{
      this.mStyle = "default";
      document.body.style.cursor = "default";
    }
  }

	setWorld():void{
		this.world = this.engine.world;
		this.mouse = this.matter.Mouse.create(this.render.canvas);
    const self:any = this,
          mouseConstraint:any = this.matter.MouseConstraint.create(this.engine, {
        		mouse: this.mouse,
       			constraint: {
              stiffness: .5,
              render: { visible: true}
        		}
    		  });

  	this.matter.World.add(this.world, mouseConstraint);
  	this.render.mouse = this.mouse;
  	this.world.bodies = [];

    this.matter.Events.on(mouseConstraint, "startdrag", ()=>{
      self.mStyle = "grabbing";
      let fFox:boolean = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      document.body.style.cursor = fFox ? "grabbing":"-webkit-grabbing";
    });

    this.matter.Events.on(mouseConstraint, "enddrag", ()=>{
        self.mStyle = undefined;
    });

	}

	scaleWalls(w:number, h:number, scale:number):void{
    h/=scale; w/=scale;
		const options = { isStatic: true },
          walls:any[] = [
            this.matter.Bodies.rectangle(w/2, h + 40, w, 80, options),
            this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
            this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
          ]

    this.matter.World.add(this.world, walls);
		this.matter.World.remove(this.world, this.walls);
    this.walls = walls;
	}

	addWalls(w:number, h:number):void{
  	const options = { 
  	  'isStatic': true,
      'label': 'wall'
  	}, scale = w/this.sRate;
    w /= scale; h /= scale;

    this.walls = [
		  this.matter.Bodies.rectangle(w/2, h + 40, w, 80, options),
		  this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
		  this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
	  ];

		this.matter.World.add(this.world, this.walls);
	}

  addSkills(skills:SkillType[]):void{
    for (let skillType of skills){
      for (let skill of skillType.entries){
        let p:PhConfig = skill.physics;
        if (p.t == 'none') continue;

        let tUrl = 'https://s3.amazonaws.com/prosepair/' + p.n + '.png';

        if (p.t == 'circle')
          this.addCircle(p.n, p.r, p.c, {
            'texture': tUrl,
            'xScale': p.s,
            'yScale': p.s
          });
        else if (p.t == 'rect' && this.bridge && this.bridge.label != p.n)
            this.addRectangle(p.n, p.d, p.c, {
              'texture': tUrl,
              'xScale': p.s,
              'yScale': p.s,
            });
      }
    }
  }

  addBridge(skills:SkillType[]){
    var br:any[] = [];
    for (let skillType of skills){
      for (let skill of skillType.entries){
          if (skill.physics.b) br.push(skill.physics);
      }
    }
    if (br.length < 1) return;

    const b = br[Math.floor(Math.random() * br.length)];
    let tUrl = 'https://s3.amazonaws.com/prosepair/' + b.n + '.png';
    this.addRectangle(b.n, b.d, b.c, {
      'texture': tUrl,
      'xScale': b.s,
      'yScale': b.s
    }, true);
    this.addConstraint();
  }

  addCircle(key:string, radius:number, coord:number[], spriteRender:Object, density:number=1){

    if (!spriteRender) return;

    let options:Object = {
        visible: false,
        isStatic: false,
        density: density,
        restitution: .8,
        friction: 1.01,
    };

    options['render'] = {
      'strokeStyle': '#333333',
      'sprite': spriteRender
    }
        
    const c:number[] = this.getRandomCoord(),
          circle:any = this.matter.Bodies
                         .circle(c[0], c[1], radius, options);

    this.matter.World.add(this.world, circle);
  }

  adjustHeight(scale:number){
    let maxY:number = this.world.bodies[0].position.y;
    const floorY:number = this.walls[0]['position'].y;

    for (let i = 1; i < this.world.bodies.length; i++){
      if (this.world.bodies[i].position.y > maxY)
        maxY = this.world.bodies[i].position.y;
    }

    if (maxY > floorY){
      const diff:number = maxY - floorY;

      for (let i = 0; i < this.world.bodies.length; i++){
        if (this.world.bodies[i].label == 'wall')
          continue;

        let oldY:number = this.world.bodies[i].position.y;
        if (oldY - diff > -100){
          let newPos = {
              'x': this.world.bodies[i].position.x,
              'y': this.world.bodies[i].position.y - diff - (20/scale)
          };

          this.matter.Body.setPosition(this.world.bodies[i], newPos);
        }
      }

      for (let i = 0; i < this.world.constraints.length; i++){
        if (this.world.constraints[i].label == 'Mouse Constraint')
          continue;

        let oldY:number = this.world.constraints[i].pointB.y;
        if (oldY - diff > -100)
          this.world.constraints[i].pointB.y = oldY - diff - (20/scale)
      }
    }
  }


  addRectangle(key:string, dimen:number[], coord:number[], 
    spriteRender:Object, br:boolean = false, density:number=1):void{

    let options:Object = {
        visible: false,
        isStatic: false,
        density: density,
        restitution: .8,
        friction: 1.01,
        label: key
    };

    options['render'] = {
      'strokeStyle': '#333333',
      'sprite': spriteRender
    }

    let c:number[] = br ? this.getBridgeCoord():this.getRandomCoord(),
          rect = this.matter.Bodies
                  .rectangle(c[0], c[1], dimen[0],dimen[1], options);
    this.matter.World.add(this.world, rect);
    if (br) this.bridge = rect;

 }

  getRandomCoord():number[]{
    const scale = window.innerWidth/this.sRate,
          width = window.innerWidth/scale,
          height = window.innerHeight/scale;

    return[ 
      Math.random() * (width * .9 - width * .1) + width * .1,
      Math.random() * (height - (-height * 3)) - height * 3
    ];
  }

  getBridgeCoord():number[]{
     const scale = window.innerWidth/this.sRate,
           width = window.innerWidth/scale,
           height = window.innerHeight/scale;

    return[width/2, (height/scale) * 1.05];
  }

  addConstraint(){
    const scale = window.innerWidth/this.sRate,
          bCoord:number[] = this.getBridgeCoord(),
          pointA:Object = {
            'x': bCoord[0] - (40/scale),
            'y': bCoord[1] - (40/scale)
          }, pointB:Object = {
            'x': bCoord[0] + (40/scale),
            'y': bCoord[1] + (40/scale)
          };

    const constraints = [
            this.matter.Constraint.create({'bodyA':this.bridge, 'pointB': pointA}),
            this.matter.Constraint.create({'bodyA':this.bridge, 'pointB': pointB})
          ];
    
    this.matter.World.add(this.world, constraints);
  }

  cancelService():void{
    this.enable = false;
    this.engine.events = {};
    this.matter.World.clear(this.world);
    this.matter = null;
    this.cHeight = null;
    this.cWidth = null;
    this.world = null;
    this.engine = null;
    this.bridge = null;

    this.zone.runOutsideAngular(()=>{
      if (this.promise) 
        clearTimeout(this.promise);
      if (!this.pause)
        window.cancelAnimationFrame(this.events['u']);
      else 
        this.pause = false;

      window.document.removeEventListener('resize', this.events['r'], true);
      window.document.body.style.cursor = "initial";
      const canvas = <HTMLCanvasElement>window.document.getElementById("canvas"),
            context:CanvasRenderingContext2D = canvas.getContext('2d'),
            scale:number = canvas.width/this.sRate;

      context.clearRect(0,0, canvas.width/scale, canvas.height/scale);
    });
  }

}