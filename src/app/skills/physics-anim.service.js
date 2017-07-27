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
var PhysicsAnimService = (function () {
    function PhysicsAnimService(zone) {
        this.zone = zone;
    }
    ;
    PhysicsAnimService.prototype.enableAnimService = function (skills, sRate) {
        var _this = this;
        if (sRate === void 0) { sRate = 1000; }
        this.enable = true;
        this.events = {};
        this.zone.runOutsideAngular(function () {
            var canvas = document.getElementById('canvas'), context = canvas.getContext('2d');
            var width = document.getElementById('pContainer').offsetWidth, height = document.getElementById('pContainer').offsetHeight;
            _this.sRate = sRate;
            _this.matter = Matter;
            _this.setRender(canvas, context, width, height);
            _this.setWorld();
            _this.addWalls(width, height);
            _this.addBridge(skills);
            _this.addSkills(skills);
            _this.cWidth = width;
            _this.addResizeHandler();
            _this.events['u'] = window.requestAnimationFrame(_this.update.bind(_this));
        });
    };
    PhysicsAnimService.prototype.update = function () {
        if (this.pause)
            window.document.body.style.cursor = "initial";
        if (!this.enable)
            return;
        this.events['u'] = window.requestAnimationFrame(this.update.bind(this));
        var canvas = document.getElementById('canvas'), context = canvas.getContext('2d');
        var w = document.getElementById('pContainer').offsetWidth, h = document.getElementById('pContainer').offsetHeight, scale = w / this.sRate;
        canvas.height = h;
        canvas.width = w;
        this.scaleWalls(w, h, scale);
        this.render.context.scale(scale, scale);
        this.matter.Mouse.setScale(this.render.mouse, { x: 1 / scale, y: 1 / scale });
        this.detectMouseCollision();
        this.matter.Render.world(this.render);
        if (!this.sizeDown && !this.sizeUp)
            this.matter.Engine.update(this.engine);
        else if (this.sizeUp)
            this.adjustHeight(scale);
    };
    PhysicsAnimService.prototype.pauseAnimService = function () {
        this.enable = false;
        this.pause = true;
    };
    PhysicsAnimService.prototype.resumeAnimService = function () {
        var _this = this;
        this.enable = true;
        this.pause = false;
        this.zone.runOutsideAngular(function () {
            _this.events['u'] = window.requestAnimationFrame(_this.update.bind(_this));
        });
    };
    PhysicsAnimService.prototype.addResizeHandler = function () {
        this.events['r'] = this.handleResize.bind(this);
        window.addEventListener('resize', this.events['r'], true);
    };
    PhysicsAnimService.prototype.handleResize = function () {
        var _this = this;
        if (this.promise)
            clearTimeout(this.promise);
        if (!this.enable)
            return;
        var w = document.getElementById('pContainer').offsetWidth;
        this.sizeDown = w < this.cWidth;
        this.sizeUp = !this.sizeDown;
        this.cWidth = w;
        this.promise = setTimeout(function () {
            _this.sizeUp = false;
            _this.sizeDown = false;
        }, 300);
    };
    PhysicsAnimService.prototype.setRender = function (c, ctx, w, h) {
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
    };
    PhysicsAnimService.prototype.detectMouseCollision = function () {
        if (this.mStyle == "grabbing")
            return;
        var bodies = this.matter.Composite.allBodies(this.world), mouseVector = this.render.mouse.position, col = this.matter.Query.point(bodies, mouseVector);
        if (col.length > 0) {
            var fFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            document.body.style.cursor = fFox ? "grab" : "-webkit-grab";
            this.mStyle = "grab";
        }
        else {
            this.mStyle = "default";
            document.body.style.cursor = "default";
        }
    };
    PhysicsAnimService.prototype.setWorld = function () {
        this.world = this.engine.world;
        this.mouse = this.matter.Mouse.create(this.render.canvas);
        var self = this, mouseConstraint = this.matter.MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: .5,
                render: { visible: true }
            }
        });
        this.matter.World.add(this.world, mouseConstraint);
        this.render.mouse = this.mouse;
        this.world.bodies = [];
        this.matter.Events.on(mouseConstraint, "startdrag", function () {
            self.mStyle = "grabbing";
            var fFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            document.body.style.cursor = fFox ? "grabbing" : "-webkit-grabbing";
        });
        this.matter.Events.on(mouseConstraint, "enddrag", function () {
            self.mStyle = undefined;
        });
    };
    PhysicsAnimService.prototype.scaleWalls = function (w, h, scale) {
        h /= scale;
        w /= scale;
        var options = { isStatic: true }, walls = [
            this.matter.Bodies.rectangle(w / 2, h + 40, w, 80, options),
            this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
            this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
        ];
        this.matter.World.add(this.world, walls);
        this.matter.World.remove(this.world, this.walls);
        this.walls = walls;
    };
    PhysicsAnimService.prototype.addWalls = function (w, h) {
        var options = {
            'isStatic': true,
            'label': 'wall'
        }, scale = w / this.sRate;
        w /= scale;
        h /= scale;
        this.walls = [
            this.matter.Bodies.rectangle(w / 2, h + 40, w, 80, options),
            this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
            this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
        ];
        this.matter.World.add(this.world, this.walls);
    };
    PhysicsAnimService.prototype.addSkills = function (skills) {
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var skillType = skills_1[_i];
            for (var _a = 0, _b = skillType.entries; _a < _b.length; _a++) {
                var skill = _b[_a];
                var p = skill.physics;
                if (p.t == 'none')
                    continue;
                var tUrl = 'https://s3.amazonaws.com/prosepair/' + p.n + '.png';
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
    };
    PhysicsAnimService.prototype.addBridge = function (skills) {
        var br = [];
        for (var _i = 0, skills_2 = skills; _i < skills_2.length; _i++) {
            var skillType = skills_2[_i];
            for (var _a = 0, _b = skillType.entries; _a < _b.length; _a++) {
                var skill = _b[_a];
                if (skill.physics.b)
                    br.push(skill.physics);
            }
        }
        if (br.length < 1)
            return;
        var b = br[Math.floor(Math.random() * br.length)];
        var tUrl = 'https://s3.amazonaws.com/prosepair/' + b.n + '.png';
        this.addRectangle(b.n, b.d, b.c, {
            'texture': tUrl,
            'xScale': b.s,
            'yScale': b.s
        }, true);
        this.addConstraint();
    };
    PhysicsAnimService.prototype.addCircle = function (key, radius, coord, spriteRender, density) {
        if (density === void 0) { density = 1; }
        if (!spriteRender)
            return;
        var options = {
            visible: false,
            isStatic: false,
            density: density,
            restitution: .8,
            friction: 1.01,
        };
        options['render'] = {
            'strokeStyle': '#333333',
            'sprite': spriteRender
        };
        var c = this.getRandomCoord(), circle = this.matter.Bodies
            .circle(c[0], c[1], radius, options);
        this.matter.World.add(this.world, circle);
    };
    PhysicsAnimService.prototype.adjustHeight = function (scale) {
        var maxY = this.world.bodies[0].position.y;
        var floorY = this.walls[0]['position'].y;
        for (var i = 1; i < this.world.bodies.length; i++) {
            if (this.world.bodies[i].position.y > maxY)
                maxY = this.world.bodies[i].position.y;
        }
        if (maxY > floorY) {
            var diff = maxY - floorY;
            for (var i = 0; i < this.world.bodies.length; i++) {
                if (this.world.bodies[i].label == 'wall')
                    continue;
                var oldY = this.world.bodies[i].position.y;
                if (oldY - diff > -100) {
                    var newPos = {
                        'x': this.world.bodies[i].position.x,
                        'y': this.world.bodies[i].position.y - diff - (20 / scale)
                    };
                    this.matter.Body.setPosition(this.world.bodies[i], newPos);
                }
            }
            for (var i = 0; i < this.world.constraints.length; i++) {
                if (this.world.constraints[i].label == 'Mouse Constraint')
                    continue;
                var oldY = this.world.constraints[i].pointB.y;
                if (oldY - diff > -100)
                    this.world.constraints[i].pointB.y = oldY - diff - (20 / scale);
            }
        }
    };
    PhysicsAnimService.prototype.addRectangle = function (key, dimen, coord, spriteRender, br, density) {
        if (br === void 0) { br = false; }
        if (density === void 0) { density = 1; }
        var options = {
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
        };
        var c = br ? this.getBridgeCoord() : this.getRandomCoord(), rect = this.matter.Bodies
            .rectangle(c[0], c[1], dimen[0], dimen[1], options);
        this.matter.World.add(this.world, rect);
        if (br)
            this.bridge = rect;
    };
    PhysicsAnimService.prototype.getRandomCoord = function () {
        var scale = window.innerWidth / this.sRate, width = window.innerWidth / scale, height = window.innerHeight / scale;
        return [
            Math.random() * (width * .9 - width * .1) + width * .1,
            Math.random() * (height - (-height * 3)) - height * 3
        ];
    };
    PhysicsAnimService.prototype.getBridgeCoord = function () {
        var scale = window.innerWidth / this.sRate, width = window.innerWidth / scale, height = window.innerHeight / scale;
        return [width / 2, (height / scale) * 1.05];
    };
    PhysicsAnimService.prototype.addConstraint = function () {
        var scale = window.innerWidth / this.sRate, bCoord = this.getBridgeCoord(), pointA = {
            'x': bCoord[0] - (40 / scale),
            'y': bCoord[1] - (40 / scale)
        }, pointB = {
            'x': bCoord[0] + (40 / scale),
            'y': bCoord[1] + (40 / scale)
        };
        var constraints = [
            this.matter.Constraint.create({ 'bodyA': this.bridge, 'pointB': pointA }),
            this.matter.Constraint.create({ 'bodyA': this.bridge, 'pointB': pointB })
        ];
        this.matter.World.add(this.world, constraints);
    };
    PhysicsAnimService.prototype.cancelService = function () {
        var _this = this;
        this.enable = false;
        this.engine.events = {};
        this.matter.World.clear(this.world);
        this.matter = null;
        this.cHeight = null;
        this.cWidth = null;
        this.world = null;
        this.engine = null;
        this.bridge = null;
        this.zone.runOutsideAngular(function () {
            if (_this.promise)
                clearTimeout(_this.promise);
            if (!_this.pause)
                window.cancelAnimationFrame(_this.events['u']);
            else
                _this.pause = false;
            window.document.removeEventListener('resize', _this.events['r'], true);
            window.document.body.style.cursor = "initial";
            var canvas = window.document.getElementById("canvas"), context = canvas.getContext('2d'), scale = canvas.width / _this.sRate;
            context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
        });
    };
    return PhysicsAnimService;
}());
PhysicsAnimService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], PhysicsAnimService);
exports.PhysicsAnimService = PhysicsAnimService;
//# sourceMappingURL=physics-anim.service.js.map