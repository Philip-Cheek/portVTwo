"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var skills_1 = require("../skills/skillList/skills");
var Subject_1 = require("rxjs/Subject");
var PreLoadService = (function () {
    function PreLoadService() {
        this.matterCounter = 0;
        this.matterLoaded = new Subject_1.Subject();
    }
    PreLoadService.prototype.preLoadMatterImages = function () {
        var _this = this;
        if (!this.matterImages)
            this.matterImages = [];
        for (var _i = 0, Skills_1 = skills_1.Skills; _i < Skills_1.length; _i++) {
            var skillType = Skills_1[_i];
            for (var _a = 0, _b = skillType.entries; _a < _b.length; _a++) {
                var skill = _b[_a];
                var p = skill.physics;
                if (p.t != 'none') {
                    var tUrl = 'https://s3.amazonaws.com/prosepair/' + p.n + '.png';
                    this.loadImage(tUrl, function () {
                        _this.matterCounter++;
                        if (_this.matterImagesLoaded()) {
                            _this.matterLoaded.next(true);
                        }
                    });
                }
            }
        }
    };
    PreLoadService.prototype.matterLoadingUpdate = function () {
        return this.matterLoaded.asObservable();
    };
    PreLoadService.prototype.matterImagesLoaded = function () {
        return this.matterCounter == this.matterImages.length;
    };
    PreLoadService.prototype.loadImage = function (url, callback) {
        try {
            var img = new Image();
            img.src = url;
            if (img.complete)
                callback();
            else
                img.onload = callback;
            this.matterImages.push(img);
        }
        catch (e) {
            console.log(e);
        }
    };
    return PreLoadService;
}());
PreLoadService = __decorate([
    core_1.Injectable()
], PreLoadService);
exports.PreLoadService = PreLoadService;
//# sourceMappingURL=pre-load.service.js.map