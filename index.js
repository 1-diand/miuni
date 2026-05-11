(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"index_atlas_1", frames: [[1433,805,162,79],[1678,771,162,83],[1842,771,162,83],[1683,622,211,147],[1730,465,211,155],[1470,532,211,155],[0,0,344,530],[346,0,344,530],[1730,0,142,463],[1896,622,142,57],[1943,428,94,182],[1874,0,94,426],[692,0,344,530],[1038,0,344,530],[345,679,1086,139],[345,532,1123,145],[1384,0,344,530],[0,532,343,528],[1433,689,243,114],[1896,681,111,31]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_132 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(img.CachedBmp_118);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2958,432);


(lib.CachedBmp_117 = function() {
	this.initialize(img.CachedBmp_117);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3333,16);


(lib.CachedBmp_116 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.fondo = function() {
	this.initialize(img.fondo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2045,2336);


(lib.Imagen1 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Mapadebits37 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("mouseclick290204");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Capa_1
	this.instance = new lib.Mapadebits37();
	this.instance.setTransform(30,2,0.9414,0.9414);

	this.instance_1 = new lib.CachedBmp_130();
	this.instance_1.setTransform(0,0.05);

	this.instance_2 = new lib.CachedBmp_131();
	this.instance_2.setTransform(0,0.05);

	this.instance_3 = new lib.CachedBmp_132();
	this.instance_3.setTransform(0,4.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance,p:{scaleX:0.9414,scaleY:0.9414,x:30,y:2}}]}).to({state:[{t:this.instance_2},{t:this.instance,p:{scaleX:0.9414,scaleY:0.9414,x:30,y:2}}]},1).to({state:[{t:this.instance_3},{t:this.instance,p:{scaleX:0.8676,scaleY:0.8676,x:33,y:13}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,162,83.2);


(lib.Símbolo4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("mouseclick290204");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Capa_1
	this.instance = new lib.Imagen1();
	this.instance.setTransform(8,86);

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0.098)","rgba(255,255,255,0.298)"],[0,1],4.4,-11,0,4.4,-11,9.8).s().p("AgyAbQgVgLAAgQQAAgPAVgMQAVgLAdAAQAeAAAVALQAVAMAAAPQAAAQgVALQgVAMgeAAQgdAAgVgMg");
	this.shape.setTransform(18.085,99.5157,1.4604,0.9988);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(255,255,255,0.098)","rgba(255,255,255,0.298)"],[0,1],12.2,-11.8,0,12.2,-11.8,13.5).s().p("AhZAbQglgLAAgQQAAgPAlgLQAlgMA0AAQA1AAAlAMQAlALAAAPQAAAQglALQglAMg1AAQgzAAgmgMg");
	this.shape_1.setTransform(18.8517,99.7654,1.4604,0.9988);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{scaleX:1.4604,scaleY:0.9988,x:18.8517,y:99.7654}},{t:this.shape,p:{scaleX:1.4604,scaleY:0.9988,x:18.085,y:99.5157}},{t:this.instance,p:{scaleX:1,scaleY:1,x:8,y:86}}]}).to({state:[{t:this.shape_1,p:{scaleX:1.4604,scaleY:0.9988,x:18.8517,y:99.7654}},{t:this.shape,p:{scaleX:1.4604,scaleY:0.9988,x:18.085,y:99.5157}},{t:this.instance,p:{scaleX:1,scaleY:1,x:8,y:86}}]},1).to({state:[{t:this.shape_1,p:{scaleX:1.3672,scaleY:0.935,x:25.8168,y:102.6124}},{t:this.shape,p:{scaleX:1.3672,scaleY:0.935,x:25.099,y:102.3786}},{t:this.instance,p:{scaleX:0.9362,scaleY:0.9362,x:15.5,y:89.65}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,86,250.7,114);


(lib.Símbolo3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("mouseclick290204");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// Capa_1
	this.instance = new lib.CachedBmp_127();

	this.instance_1 = new lib.CachedBmp_128();

	this.instance_2 = new lib.CachedBmp_129();
	this.instance_2.setTransform(0,8.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,211,155.1);


(lib.SmokeCloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlcFdQiRiRAAjMQAAjMCRiQQCQiRDMAAQDMAACRCRQCRCQAADMQAADMiRCRQiRCRjMAAQjMAAiQiRg");
	this.shape.setTransform(49.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-49.4,98.8,98.8);


(lib.Rectangle_20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIAWIAAgrIKRAAIAAArg");
	this.shape.setTransform(32.875,2.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_20, new cjs.Rectangle(0,0,65.8,4.5), null);


(lib.Rectangle_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIALIAAgVIKRAAIAAAVg");
	this.shape.setTransform(32.875,1.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_19, new cjs.Rectangle(0,0,65.8,2.2), null);


(lib.Rectangle_15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIAWIAAgrIKRAAIAAArg");
	this.shape.setTransform(32.875,2.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_15, new cjs.Rectangle(0,0,65.8,4.5), null);


(lib.Rectangle_14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIALIAAgVIKRAAIAAAVg");
	this.shape.setTransform(32.875,1.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_14, new cjs.Rectangle(0,0,65.8,2.2), null);


(lib.Rectangle_13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIAWIAAgrIKRAAIAAArg");
	this.shape.setTransform(32.875,2.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_13, new cjs.Rectangle(0,0,65.8,4.5), null);


(lib.Rectangle_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIALIAAgVIKRAAIAAAVg");
	this.shape.setTransform(32.875,1.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_12, new cjs.Rectangle(0,0,65.8,2.2), null);


(lib.Rectangle_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIAXIAAgtIKRAAIAAAtg");
	this.shape.setTransform(32.875,2.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_11, new cjs.Rectangle(0,0,65.8,4.5), null);


(lib.Rectangle_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AlIALIAAgVIKRAAIAAAVg");
	this.shape.setTransform(32.875,1.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_10, new cjs.Rectangle(0,0,65.8,2.3), null);


(lib.Rectangle_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AnvAWIAAgrIPfAAIAAArg");
	this.shape.setTransform(49.6,2.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_7, new cjs.Rectangle(0,0,99.2,4.5), null);


(lib.Rectangle_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#752994").s().p("AnvAIIAAgPIPfAAIAAAPg");
	this.shape.setTransform(49.6,0.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle_6, new cjs.Rectangle(0,0,99.2,1.6), null);


(lib.Path_18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB22A").s().p("ACeFPQhYgQhHgfQhVgjhGg6QhNhAgrhOQgZgtgKgqQgKgvALgkIDmjrQA0gIBBAnQA7AiA0A8QA0A9AkBIQAkBIAOBHQAKAyAFBnQAEBjAMA2QhhgJg+gLg");
	this.shape.setTransform(31.6811,35.4489);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18, new cjs.Rectangle(0,0,63.4,70.9), null);


(lib.Path_17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("ABsDlQg8gMgxgUQg5gYgxgoQg0gsgeg1QgRgegGgdQgHggAHgZICdigQAkgGAtAbQAoAYAjApQAkAqAYAwQAZAxAJAxQAHAiADBGQADBEAIAkQhDgGgpgHg");
	this.shape.setTransform(21.6185,24.1946);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_17, new cjs.Rectangle(0,0,43.3,48.4), null);


(lib.Ellipse_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(253,202,115,0)","#FFF7B2"],[0.039,1],0,42.5,0,-42.5).s().p("AhKEtQgfh9AAiwQAAivAfh9QAgh8AqAAQArAAAgB8QAeB9AACvQAACwgeB9QggB8grAAQgqAAggh8g");
	this.shape.setTransform(10.55,42.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Ellipse_2, new cjs.Rectangle(0,0,21.1,85.1), null);


(lib.Ellipse_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(253,202,115,0)","#FFFDEA"],[0.039,1],0,69.3,0,-69.2).s().p("Ah4HqQgzjLAAkfQAAkeAzjLQAyjLBGAAQBHAAAyDLQAzDLgBEeQABEfgzDLQgyDLhHAAQhGAAgyjLg");
	this.shape.setTransform(17.15,69.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Ellipse_1, new cjs.Rectangle(0,0,34.3,138.6), null);


(lib.Ellipse_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(253,202,115,0)","#FFFDEA"],[0.039,1],0,69.3,0,-69.2).s().p("Ah5HqQgyjLABkfQgBkeAyjLQAzjLBGAAQBHAAAyDLQAyDLABEeQgBEfgyDLQgyDLhHAAQhGAAgzjLg");
	this.shape.setTransform(54.1,106.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Ellipse_0, new cjs.Rectangle(37,37,34.3,138.5), null);


(lib.Path_43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AsUDZIAAjZQBPAUBFAsQAyh8BvhNQByhPCLAAQCLAABwBPQBwBOAyB8QAVgDAQAAQBBAAA2AlQA1AkAYA6QAvgdA4AAQA5AAAxAfQAbgsAqgfQApggAygPQgDAugiAfIAABDg");
	this.shape.setTransform(78.9,21.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_43, new cjs.Rectangle(0,0,157.8,43.4), null);


(lib.Path_41 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Ap4C5QgHgWAAgXQAAglASghQAoAWAjAiQAugUAzAAQA5AAA0AZQAhgyA1gdQA3geA+AAQAnAAAnANQArhhBZg9QBbg9BvAAQBlAABXA0QBTAyAwBUQAsBPACBbQgtANgwAAg");
	this.shape.setTransform(63.975,18.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_41, new cjs.Rectangle(0,0,128,37), null);


(lib.Path_40 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Ak5FMQDWjYBum/QCAANBXBhQBYBhAACBQAAB0hGBbQhEBZhsAfg");
	this.shape.setTransform(31.375,33.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_40, new cjs.Rectangle(0,0,62.8,66.4), null);


(lib.Path_39 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Aj9FcIAAmoQAAheA4hMQA3hJBYgcQAkClAxCIQBcD2CDCUg");
	this.shape.setTransform(25.4,34.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_39, new cjs.Rectangle(0,0,50.8,69.6), null);


(lib.Path_35 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AjhCqQB0iABUjTQBBAWA2AsQA1AsAiA7QArBNACBdg");
	this.shape.setTransform(22.625,16.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_35, new cjs.Rectangle(0,0,45.3,34), null);


(lib.Path_34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Ao8DVQA7h1BwhIQBzhHCIAAQCNAAB1BMQAghQA9g/QA9g/BPgkQBdERCLCZg");
	this.shape.setTransform(57.325,21.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_34, new cjs.Rectangle(0,0,114.7,42.7), null);


(lib.Path_25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Ah1CrQAIhoAzhZQAyhZBQg8QAuBSAABeQAABYgoBOg");
	this.shape.setTransform(11.825,17.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_25, new cjs.Rectangle(0,0,23.7,34.3), null);


(lib.Path_23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AgbAcQgLgMAAgQQAAgPALgMQAMgLAPAAQAQAAAMALQALAMAAAPQAAAQgLAMQgMALgQAAQgPAAgMgLg");
	this.shape.setTransform(3.925,3.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_23, new cjs.Rectangle(0,0,7.9,7.9), null);


(lib.Path_22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AgsAtQgTgTAAgaQAAgZATgTQATgTAZAAQAaAAATATQASATAAAZQAAAagSATQgTASgaAAQgZAAgTgSg");
	this.shape.setTransform(6.35,6.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_22, new cjs.Rectangle(0,0,12.7,12.7), null);


(lib.Path_21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("Ag9A+QgagZAAglQAAgjAagaQAagaAjAAQAlAAAZAaQAaAaAAAjQAAAlgaAZQgZAaglAAQgjAAgagag");
	this.shape.setTransform(8.825,8.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,17.7,17.7), null);


(lib.Path_20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AgXAXQgKgJAAgOQAAgNAKgKQAKgKANAAQAOAAAKAKQAKAKAAANQAAAOgKAJQgKAKgOAAQgNAAgKgKg");
	this.shape.setTransform(3.375,3.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_20, new cjs.Rectangle(0,0,6.8,6.7), null);


(lib.Path_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9ADBF8").s().p("AhFBGQgdgdAAgpQAAgoAdgdQAdgdAoAAQApAAAdAdQAdAdAAAoQAAApgdAdQgdAdgpAAQgoAAgdgdg");
	this.shape.setTransform(9.9,9.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,19.8,19.9), null);


(lib.Path_18_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#9ADBF8").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_1.setTransform(3.55,3.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18_1, new cjs.Rectangle(0,0,7.1,7.1), null);


(lib.SmokeCloud_Ani = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2_copy_copy
	this.instance = new lib.SmokeCloud("synched",0);
	this.instance.setTransform(-236.15,-276.2,0.512,0.512,0,0,0,48.2,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10).to({_off:false},0).wait(1).to({regX:49.4,scaleX:0.5546,scaleY:0.5546,x:-220.7,y:-280.45,alpha:0.9985},0).wait(1).to({scaleX:0.5973,scaleY:0.5973,x:-205.95,y:-284.7,alpha:0.997},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:-191.3,y:-288.95,alpha:0.9954},0).wait(1).to({scaleX:0.6826,scaleY:0.6826,x:-176.8,y:-293.1,alpha:0.9937},0).wait(1).to({scaleX:0.7253,scaleY:0.7253,x:-162.5,y:-297.25,alpha:0.9919},0).wait(1).to({scaleX:0.7679,scaleY:0.7679,x:-148.45,y:-301.3,alpha:0.9901},0).wait(1).to({scaleX:0.8106,scaleY:0.8106,x:-134.75,y:-305.25,alpha:0.9882},0).wait(1).to({scaleX:0.8533,scaleY:0.8533,x:-121.4,y:-309.1,alpha:0.9862},0).wait(1).to({scaleX:0.8959,scaleY:0.8959,x:-108.4,y:-312.85,alpha:0.984},0).wait(1).to({scaleX:0.9386,scaleY:0.9386,x:-95.9,y:-316.45,alpha:0.9818},0).wait(1).to({scaleX:0.9813,scaleY:0.9813,x:-83.8,y:-319.95,alpha:0.9794},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,x:-72.1,y:-323.3,alpha:0.9769},0).wait(1).to({scaleX:1.0666,scaleY:1.0666,x:-60.95,y:-326.55,alpha:0.9743},0).wait(1).to({scaleX:1.1093,scaleY:1.1093,x:-50.3,y:-329.6,alpha:0.9715},0).wait(1).to({scaleX:1.1519,scaleY:1.1519,x:-40.1,y:-332.55,alpha:0.9686},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:-30.45,y:-335.35,alpha:0.9655},0).wait(1).to({scaleX:1.2372,scaleY:1.2372,x:-21.2,y:-338,alpha:0.9622},0).wait(1).to({scaleX:1.2799,scaleY:1.2799,x:-12.4,y:-340.5,alpha:0.9587},0).wait(1).to({scaleX:1.3226,scaleY:1.3226,x:-4.05,y:-342.9,alpha:0.955},0).wait(1).to({scaleX:1.3652,scaleY:1.3652,x:3.8,y:-345.2,alpha:0.951},0).wait(1).to({scaleX:1.4079,scaleY:1.4079,x:11.3,y:-347.35,alpha:0.9468},0).wait(1).to({scaleX:1.4506,scaleY:1.4506,x:18.4,y:-349.4,alpha:0.9424},0).wait(1).to({scaleX:1.4932,scaleY:1.4932,x:25.1,y:-351.3,alpha:0.9376},0).wait(1).to({scaleX:1.5359,scaleY:1.5359,x:31.45,y:-353.15,alpha:0.9326},0).wait(1).to({scaleX:1.5786,scaleY:1.5786,x:37.5,y:-354.85,alpha:0.9272},0).wait(1).to({scaleX:1.6212,scaleY:1.6212,x:43.2,y:-356.5,alpha:0.9215},0).wait(1).to({scaleX:1.6639,scaleY:1.6639,x:48.55,y:-358.05,alpha:0.9154},0).wait(1).to({scaleX:1.7065,scaleY:1.7065,x:53.65,y:-359.5,alpha:0.9089},0).wait(1).to({scaleX:1.7492,scaleY:1.7492,x:58.45,y:-360.9,alpha:0.902},0).wait(1).to({scaleX:1.7919,scaleY:1.7919,x:63,y:-362.2,alpha:0.8946},0).wait(1).to({scaleX:1.8345,scaleY:1.8345,x:67.35,y:-363.4,alpha:0.8867},0).wait(1).to({scaleX:1.8772,scaleY:1.8772,x:71.45,y:-364.6,alpha:0.8783},0).wait(1).to({scaleX:1.9199,scaleY:1.9199,x:75.3,y:-365.7,alpha:0.8693},0).wait(1).to({scaleX:1.9625,scaleY:1.9625,x:78.9,y:-366.75,alpha:0.8597},0).wait(1).to({scaleX:2.0052,scaleY:2.0052,x:82.35,y:-367.7,alpha:0.8496},0).wait(1).to({scaleX:2.0479,scaleY:2.0479,x:85.6,y:-368.65,alpha:0.8387},0).wait(1).to({scaleX:2.0905,scaleY:2.0905,x:88.65,y:-369.5,alpha:0.8271},0).wait(1).to({scaleX:2.1332,scaleY:2.1332,x:91.6,y:-370.35,alpha:0.8148},0).wait(1).to({scaleX:2.1758,scaleY:2.1758,x:94.35,y:-371.1,alpha:0.8017},0).wait(1).to({scaleX:2.2185,scaleY:2.2185,x:96.9,y:-371.85,alpha:0.7878},0).wait(1).to({scaleX:2.2612,scaleY:2.2612,x:99.35,y:-372.55,alpha:0.773},0).wait(1).to({scaleX:2.3038,scaleY:2.3038,x:101.6,y:-373.2,alpha:0.7573},0).wait(1).to({scaleX:2.3465,scaleY:2.3465,x:103.75,y:-373.8,alpha:0.7407},0).wait(1).to({scaleX:2.3892,scaleY:2.3892,x:105.8,y:-374.4,alpha:0.7232},0).wait(1).to({scaleX:2.4318,scaleY:2.4318,x:107.75,y:-374.9,alpha:0.7047},0).wait(1).to({scaleX:2.4745,scaleY:2.4745,x:109.55,y:-375.4,alpha:0.6852},0).wait(1).to({scaleX:2.5172,scaleY:2.5172,x:111.2,y:-375.9,alpha:0.6646},0).wait(1).to({scaleX:2.5598,scaleY:2.5598,x:112.75,y:-376.35,alpha:0.6431},0).wait(1).to({scaleX:2.6025,scaleY:2.6025,x:114.2,y:-376.75,alpha:0.6205},0).wait(1).to({scaleX:2.6451,scaleY:2.6451,x:115.6,y:-377.15,alpha:0.597},0).wait(1).to({scaleX:2.6878,scaleY:2.6878,x:116.9,y:-377.5,alpha:0.5724},0).wait(1).to({scaleX:2.7305,scaleY:2.7305,x:118.1,y:-377.8,alpha:0.5468},0).wait(1).to({scaleX:2.7731,scaleY:2.7731,x:119.15,y:-378.1,alpha:0.5203},0).wait(1).to({scaleX:2.8158,scaleY:2.8158,x:120.2,y:-378.4,alpha:0.4929},0).wait(1).to({scaleX:2.8585,scaleY:2.8585,x:121.1,y:-378.65,alpha:0.4646},0).wait(1).to({scaleX:2.9011,scaleY:2.9011,x:121.95,y:-378.9,alpha:0.4354},0).wait(1).to({scaleX:2.9438,scaleY:2.9438,x:122.75,y:-379.1,alpha:0.4054},0).wait(1).to({scaleX:2.9865,scaleY:2.9865,x:123.5,y:-379.3,alpha:0.3746},0).wait(1).to({scaleX:3.0291,scaleY:3.0291,x:124.1,y:-379.45,alpha:0.3432},0).wait(1).to({scaleX:3.0718,scaleY:3.0718,x:124.7,y:-379.6,alpha:0.3111},0).wait(1).to({scaleX:3.1144,scaleY:3.1144,x:125.2,y:-379.75,alpha:0.2783},0).wait(1).to({scaleX:3.1571,scaleY:3.1571,x:125.65,y:-379.85,alpha:0.245},0).wait(1).to({scaleX:3.1998,scaleY:3.1998,x:126,y:-379.95,alpha:0.2112},0).wait(1).to({scaleX:3.2424,scaleY:3.2424,x:126.4,y:-380.05,alpha:0.1769},0).wait(1).to({scaleX:3.2851,scaleY:3.2851,x:126.65,y:-380.1,alpha:0.1422},0).wait(1).to({scaleX:3.3278,scaleY:3.3278,x:126.9,y:-380.15,alpha:0.1072},0).wait(1).to({scaleX:3.3704,scaleY:3.3704,x:127.05,y:-380.2,alpha:0.0717},0).wait(1).to({scaleX:3.4131,scaleY:3.4131,x:127.15,alpha:0.036},0).wait(1).to({regX:48.2,scaleX:3.4557,scaleY:3.4557,x:123.05,y:-380.25,alpha:0},0).wait(1));

	// Layer_2_copy
	this.instance_1 = new lib.SmokeCloud("synched",0);
	this.instance_1.setTransform(-224.05,-270.5,0.512,0.512,0,0,0,48.2,0);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6).to({_off:false},0).wait(1).to({regX:49.4,scaleX:0.5546,scaleY:0.5546,x:-215.6,y:-271,alpha:0.9985},0).wait(1).to({scaleX:0.5973,scaleY:0.5973,x:-207.8,y:-271.5,alpha:0.997},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:-200,y:-272,alpha:0.9954},0).wait(1).to({scaleX:0.6826,scaleY:0.6826,x:-192.35,y:-272.5,alpha:0.9937},0).wait(1).to({scaleX:0.7253,scaleY:0.7253,x:-184.75,y:-272.95,alpha:0.9919},0).wait(1).to({scaleX:0.7679,scaleY:0.7679,x:-177.3,y:-273.45,alpha:0.9901},0).wait(1).to({scaleX:0.8106,scaleY:0.8106,x:-170.05,y:-273.9,alpha:0.9882},0).wait(1).to({scaleX:0.8533,scaleY:0.8533,x:-162.95,y:-274.35,alpha:0.9862},0).wait(1).to({scaleX:0.8959,scaleY:0.8959,x:-156.1,y:-274.8,alpha:0.984},0).wait(1).to({scaleX:0.9386,scaleY:0.9386,x:-149.45,y:-275.25,alpha:0.9818},0).wait(1).to({scaleX:0.9813,scaleY:0.9813,x:-143.05,y:-275.65,alpha:0.9794},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,x:-136.85,y:-276.05,alpha:0.9769},0).wait(1).to({scaleX:1.0666,scaleY:1.0666,x:-130.95,y:-276.45,alpha:0.9743},0).wait(1).to({scaleX:1.1093,scaleY:1.1093,x:-125.3,y:-276.8,alpha:0.9715},0).wait(1).to({scaleX:1.1519,scaleY:1.1519,x:-119.9,y:-277.15,alpha:0.9686},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:-114.75,y:-277.45,alpha:0.9655},0).wait(1).to({scaleX:1.2372,scaleY:1.2372,x:-109.85,y:-277.8,alpha:0.9622},0).wait(1).to({scaleX:1.2799,scaleY:1.2799,x:-105.15,y:-278.1,alpha:0.9587},0).wait(1).to({scaleX:1.3226,scaleY:1.3226,x:-100.75,y:-278.35,alpha:0.955},0).wait(1).to({scaleX:1.3652,scaleY:1.3652,x:-96.55,y:-278.65,alpha:0.951},0).wait(1).to({scaleX:1.4079,scaleY:1.4079,x:-92.6,y:-278.9,alpha:0.9468},0).wait(1).to({scaleX:1.4506,scaleY:1.4506,x:-88.85,y:-279.15,alpha:0.9424},0).wait(1).to({scaleX:1.4932,scaleY:1.4932,x:-85.3,y:-279.35,alpha:0.9376},0).wait(1).to({scaleX:1.5359,scaleY:1.5359,x:-81.9,y:-279.55,alpha:0.9326},0).wait(1).to({scaleX:1.5786,scaleY:1.5786,x:-78.65,y:-279.8,alpha:0.9272},0).wait(1).to({scaleX:1.6212,scaleY:1.6212,x:-75.65,y:-279.95,alpha:0.9215},0).wait(1).to({scaleX:1.6639,scaleY:1.6639,x:-72.8,y:-280.15,alpha:0.9154},0).wait(1).to({scaleX:1.7065,scaleY:1.7065,x:-70.1,y:-280.35,alpha:0.9089},0).wait(1).to({scaleX:1.7492,scaleY:1.7492,x:-67.5,y:-280.5,alpha:0.902},0).wait(1).to({scaleX:1.7919,scaleY:1.7919,x:-65.1,y:-280.65,alpha:0.8946},0).wait(1).to({scaleX:1.8345,scaleY:1.8345,x:-62.75,y:-280.8,alpha:0.8867},0).wait(1).to({scaleX:1.8772,scaleY:1.8772,x:-60.6,y:-280.95,alpha:0.8783},0).wait(1).to({scaleX:1.9199,scaleY:1.9199,x:-58.55,y:-281.05,alpha:0.8693},0).wait(1).to({scaleX:1.9625,scaleY:1.9625,x:-56.6,y:-281.2,alpha:0.8597},0).wait(1).to({scaleX:2.0052,scaleY:2.0052,x:-54.75,y:-281.3,alpha:0.8496},0).wait(1).to({scaleX:2.0479,scaleY:2.0479,x:-53,y:-281.4,alpha:0.8387},0).wait(1).to({scaleX:2.0905,scaleY:2.0905,x:-51.4,y:-281.5,alpha:0.8271},0).wait(1).to({scaleX:2.1332,scaleY:2.1332,x:-49.8,y:-281.6,alpha:0.8148},0).wait(1).to({scaleX:2.1758,scaleY:2.1758,x:-48.35,y:-281.7,alpha:0.8017},0).wait(1).to({scaleX:2.2185,scaleY:2.2185,x:-46.95,y:-281.8,alpha:0.7878},0).wait(1).to({scaleX:2.2612,scaleY:2.2612,x:-45.65,y:-281.85,alpha:0.773},0).wait(1).to({scaleX:2.3038,scaleY:2.3038,x:-44.4,y:-281.95,alpha:0.7573},0).wait(1).to({scaleX:2.3465,scaleY:2.3465,x:-43.25,y:-282,alpha:0.7407},0).wait(1).to({scaleX:2.3892,scaleY:2.3892,x:-42.2,y:-282.1,alpha:0.7232},0).wait(1).to({scaleX:2.4318,scaleY:2.4318,x:-41.1,y:-282.15,alpha:0.7047},0).wait(1).to({scaleX:2.4745,scaleY:2.4745,x:-40.15,y:-282.2,alpha:0.6852},0).wait(1).to({scaleX:2.5172,scaleY:2.5172,x:-39.25,y:-282.25,alpha:0.6646},0).wait(1).to({scaleX:2.5598,scaleY:2.5598,x:-38.4,y:-282.3,alpha:0.6431},0).wait(1).to({scaleX:2.6025,scaleY:2.6025,x:-37.6,y:-282.35,alpha:0.6205},0).wait(1).to({scaleX:2.6451,scaleY:2.6451,x:-36.85,y:-282.4,alpha:0.597},0).wait(1).to({scaleX:2.6878,scaleY:2.6878,x:-36.15,y:-282.45,alpha:0.5724},0).wait(1).to({scaleX:2.7305,scaleY:2.7305,x:-35.5,y:-282.5,alpha:0.5468},0).wait(1).to({scaleX:2.7731,scaleY:2.7731,x:-34.9,y:-282.55,alpha:0.5203},0).wait(1).to({scaleX:2.8158,scaleY:2.8158,x:-34.35,alpha:0.4929},0).wait(1).to({scaleX:2.8585,scaleY:2.8585,x:-33.85,y:-282.6,alpha:0.4646},0).wait(1).to({scaleX:2.9011,scaleY:2.9011,x:-33.35,alpha:0.4354},0).wait(1).to({scaleX:2.9438,scaleY:2.9438,x:-32.95,y:-282.65,alpha:0.4054},0).wait(1).to({scaleX:2.9865,scaleY:2.9865,x:-32.5,alpha:0.3746},0).wait(1).to({scaleX:3.0291,scaleY:3.0291,x:-32.15,y:-282.7,alpha:0.3432},0).wait(1).to({scaleX:3.0718,scaleY:3.0718,x:-31.8,alpha:0.3111},0).wait(1).to({scaleX:3.1144,scaleY:3.1144,x:-31.55,alpha:0.2783},0).wait(1).to({scaleX:3.1571,scaleY:3.1571,x:-31.3,y:-282.75,alpha:0.245},0).wait(1).to({scaleX:3.1998,scaleY:3.1998,x:-31.05,alpha:0.2112},0).wait(1).to({scaleX:3.2424,scaleY:3.2424,x:-30.8,alpha:0.1769},0).wait(1).to({scaleX:3.2851,scaleY:3.2851,x:-30.65,alpha:0.1422},0).wait(1).to({scaleX:3.3278,scaleY:3.3278,x:-30.5,alpha:0.1072},0).wait(1).to({scaleX:3.3704,scaleY:3.3704,x:-30.4,alpha:0.0717},0).wait(1).to({scaleX:3.4131,scaleY:3.4131,x:-30.35,alpha:0.036},0).wait(1).to({regX:48.2,scaleX:3.4557,scaleY:3.4557,x:-34.45,y:-282.8,alpha:0},0).to({_off:true},1).wait(4));

	// Layer_2
	this.instance_2 = new lib.SmokeCloud("synched",0);
	this.instance_2.setTransform(-234.55,-271.75,0.512,0.512,0,0,0,48.2,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:49.4,scaleX:0.5546,scaleY:0.5546,x:-211.3,y:-274.05,alpha:0.9985},0).wait(1).to({scaleX:0.5973,scaleY:0.5973,x:-188.75,y:-276.35,alpha:0.997},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:-166.35,y:-278.65,alpha:0.9954},0).wait(1).to({scaleX:0.6826,scaleY:0.6826,x:-144.25,y:-280.95,alpha:0.9937},0).wait(1).to({scaleX:0.7253,scaleY:0.7253,x:-122.35,y:-283.2,alpha:0.9919},0).wait(1).to({scaleX:0.7679,scaleY:0.7679,x:-100.95,y:-285.4,alpha:0.9901},0).wait(1).to({scaleX:0.8106,scaleY:0.8106,x:-79.95,y:-287.55,alpha:0.9882},0).wait(1).to({scaleX:0.8533,scaleY:0.8533,x:-59.55,y:-289.6,alpha:0.9862},0).wait(1).to({scaleX:0.8959,scaleY:0.8959,x:-39.75,y:-291.65,alpha:0.984},0).wait(1).to({scaleX:0.9386,scaleY:0.9386,x:-20.6,y:-293.65,alpha:0.9818},0).wait(1).to({scaleX:0.9813,scaleY:0.9813,x:-2.1,y:-295.5,alpha:0.9794},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,x:15.7,y:-297.35,alpha:0.9769},0).wait(1).to({scaleX:1.0666,scaleY:1.0666,x:32.75,y:-299.1,alpha:0.9743},0).wait(1).to({scaleX:1.1093,scaleY:1.1093,x:49.05,y:-300.75,alpha:0.9715},0).wait(1).to({scaleX:1.1519,scaleY:1.1519,x:64.5,y:-302.35,alpha:0.9686},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:79.3,y:-303.9,alpha:0.9655},0).wait(1).to({scaleX:1.2372,scaleY:1.2372,x:93.4,y:-305.3,alpha:0.9622},0).wait(1).to({scaleX:1.2799,scaleY:1.2799,x:106.85,y:-306.7,alpha:0.9587},0).wait(1).to({scaleX:1.3226,scaleY:1.3226,x:119.55,y:-308,alpha:0.955},0).wait(1).to({scaleX:1.3652,scaleY:1.3652,x:131.6,y:-309.25,alpha:0.951},0).wait(1).to({scaleX:1.4079,scaleY:1.4079,x:143,y:-310.4,alpha:0.9468},0).wait(1).to({scaleX:1.4506,scaleY:1.4506,x:153.8,y:-311.5,alpha:0.9424},0).wait(1).to({scaleX:1.4932,scaleY:1.4932,x:164.05,y:-312.55,alpha:0.9376},0).wait(1).to({scaleX:1.5359,scaleY:1.5359,x:173.75,y:-313.55,alpha:0.9326},0).wait(1).to({scaleX:1.5786,scaleY:1.5786,x:182.95,y:-314.5,alpha:0.9272},0).wait(1).to({scaleX:1.6212,scaleY:1.6212,x:191.65,y:-315.4,alpha:0.9215},0).wait(1).to({scaleX:1.6639,scaleY:1.6639,x:199.85,y:-316.2,alpha:0.9154},0).wait(1).to({scaleX:1.7065,scaleY:1.7065,x:207.6,y:-317,alpha:0.9089},0).wait(1).to({scaleX:1.7492,scaleY:1.7492,x:214.95,y:-317.75,alpha:0.902},0).wait(1).to({scaleX:1.7919,scaleY:1.7919,x:221.85,y:-318.45,alpha:0.8946},0).wait(1).to({scaleX:1.8345,scaleY:1.8345,x:228.5,y:-319.15,alpha:0.8867},0).wait(1).to({scaleX:1.8772,scaleY:1.8772,x:234.7,y:-319.8,alpha:0.8783},0).wait(1).to({scaleX:1.9199,scaleY:1.9199,x:240.55,y:-320.4,alpha:0.8693},0).wait(1).to({scaleX:1.9625,scaleY:1.9625,x:246.1,y:-320.95,alpha:0.8597},0).wait(1).to({scaleX:2.0052,scaleY:2.0052,x:251.3,y:-321.45,alpha:0.8496},0).wait(1).to({scaleX:2.0479,scaleY:2.0479,x:256.25,y:-322,alpha:0.8387},0).wait(1).to({scaleX:2.0905,scaleY:2.0905,x:260.9,y:-322.45,alpha:0.8271},0).wait(1).to({scaleX:2.1332,scaleY:2.1332,x:265.4,y:-322.9,alpha:0.8148},0).wait(1).to({scaleX:2.1758,scaleY:2.1758,x:269.55,y:-323.35,alpha:0.8017},0).wait(1).to({scaleX:2.2185,scaleY:2.2185,x:273.45,y:-323.75,alpha:0.7878},0).wait(1).to({scaleX:2.2612,scaleY:2.2612,x:277.15,y:-324.1,alpha:0.773},0).wait(1).to({scaleX:2.3038,scaleY:2.3038,x:280.6,y:-324.45,alpha:0.7573},0).wait(1).to({scaleX:2.3465,scaleY:2.3465,x:283.9,y:-324.8,alpha:0.7407},0).wait(1).to({scaleX:2.3892,scaleY:2.3892,x:286.95,y:-325.1,alpha:0.7232},0).wait(1).to({scaleX:2.4318,scaleY:2.4318,x:289.9,y:-325.4,alpha:0.7047},0).wait(1).to({scaleX:2.4745,scaleY:2.4745,x:292.6,y:-325.65,alpha:0.6852},0).wait(1).to({scaleX:2.5172,scaleY:2.5172,x:295.1,y:-325.9,alpha:0.6646},0).wait(1).to({scaleX:2.5598,scaleY:2.5598,x:297.5,y:-326.15,alpha:0.6431},0).wait(1).to({scaleX:2.6025,scaleY:2.6025,x:299.7,y:-326.4,alpha:0.6205},0).wait(1).to({scaleX:2.6451,scaleY:2.6451,x:301.75,y:-326.6,alpha:0.597},0).wait(1).to({scaleX:2.6878,scaleY:2.6878,x:303.75,y:-326.8,alpha:0.5724},0).wait(1).to({scaleX:2.7305,scaleY:2.7305,x:305.5,y:-326.95,alpha:0.5468},0).wait(1).to({scaleX:2.7731,scaleY:2.7731,x:307.15,y:-327.15,alpha:0.5203},0).wait(1).to({scaleX:2.8158,scaleY:2.8158,x:308.7,y:-327.3,alpha:0.4929},0).wait(1).to({scaleX:2.8585,scaleY:2.8585,x:310.05,y:-327.4,alpha:0.4646},0).wait(1).to({scaleX:2.9011,scaleY:2.9011,x:311.35,y:-327.55,alpha:0.4354},0).wait(1).to({scaleX:2.9438,scaleY:2.9438,x:312.5,y:-327.65,alpha:0.4054},0).wait(1).to({scaleX:2.9865,scaleY:2.9865,x:313.6,y:-327.75,alpha:0.3746},0).wait(1).to({scaleX:3.0291,scaleY:3.0291,x:314.55,y:-327.85,alpha:0.3432},0).wait(1).to({scaleX:3.0718,scaleY:3.0718,x:315.4,y:-327.95,alpha:0.3111},0).wait(1).to({scaleX:3.1144,scaleY:3.1144,x:316.15,y:-328,alpha:0.2783},0).wait(1).to({scaleX:3.1571,scaleY:3.1571,x:316.8,y:-328.1,alpha:0.245},0).wait(1).to({scaleX:3.1998,scaleY:3.1998,x:317.4,y:-328.15,alpha:0.2112},0).wait(1).to({scaleX:3.2424,scaleY:3.2424,x:317.9,y:-328.2,alpha:0.1769},0).wait(1).to({scaleX:3.2851,scaleY:3.2851,x:318.3,alpha:0.1422},0).wait(1).to({scaleX:3.3278,scaleY:3.3278,x:318.6,y:-328.25,alpha:0.1072},0).wait(1).to({scaleX:3.3704,scaleY:3.3704,x:318.85,alpha:0.0717},0).wait(1).to({scaleX:3.4131,scaleY:3.4131,x:319,alpha:0.036},0).wait(1).to({regX:48.2,scaleX:3.4557,scaleY:3.4557,x:314.95,y:-328.3,alpha:0},0).to({_off:true},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-260.8,-550.9,750.7,438.79999999999995);


(lib.Interpolación24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _575190_2908693_ai
	this.instance = new lib.CachedBmp_124();
	this.instance.setTransform(-73.15,-122.8);

	this.instance_1 = new lib.Rectangle_6();
	this.instance_1.setTransform(-1.95,-80,1.4357,1.6333,0,0,0,49.6,0.8);
	this.instance_1.alpha = 0.1484;
	this.instance_1.compositeOperation = "multiply";

	this.instance_2 = new lib.Rectangle_7();
	this.instance_2.setTransform(-1.95,-82.5,1.4357,1.6333,0,0,0,49.6,2.1);
	this.instance_2.alpha = 0.1484;
	this.instance_2.compositeOperation = "multiply";

	this.instance_3 = new lib.CachedBmp_123();
	this.instance_3.setTransform(-73.15,-135.5);

	this.instance_4 = new lib.Rectangle_10();
	this.instance_4.setTransform(22.1,254.3,1.4357,1.6333,0,0,0,32.9,1.2);
	this.instance_4.alpha = 0.1484;
	this.instance_4.compositeOperation = "multiply";

	this.instance_5 = new lib.Rectangle_11();
	this.instance_5.setTransform(22.1,252.3,1.4357,1.6333,0,0,0,32.9,2.2);
	this.instance_5.alpha = 0.1484;
	this.instance_5.compositeOperation = "multiply";

	this.instance_6 = new lib.Rectangle_12();
	this.instance_6.setTransform(22.1,170.65,1.4357,1.6333,0,0,0,32.9,1.2);
	this.instance_6.alpha = 0.1484;
	this.instance_6.compositeOperation = "multiply";

	this.instance_7 = new lib.Rectangle_13();
	this.instance_7.setTransform(22.1,168.55,1.4357,1.6333,0,0,0,32.9,2.2);
	this.instance_7.alpha = 0.1484;
	this.instance_7.compositeOperation = "multiply";

	this.instance_8 = new lib.Rectangle_14();
	this.instance_8.setTransform(22.1,86.85,1.4357,1.6333,0,0,0,32.9,1.1);
	this.instance_8.alpha = 0.1484;
	this.instance_8.compositeOperation = "multiply";

	this.instance_9 = new lib.Rectangle_15();
	this.instance_9.setTransform(22.1,84.95,1.4357,1.6333,0,0,0,32.9,2.2);
	this.instance_9.alpha = 0.1484;
	this.instance_9.compositeOperation = "multiply";

	this.instance_10 = new lib.CachedBmp_122();
	this.instance_10.setTransform(-25.15,74.2);

	this.instance_11 = new lib.Rectangle_19();
	this.instance_11.setTransform(22.1,3.2,1.4357,1.6333,0,0,0,32.9,1.1);
	this.instance_11.alpha = 0.1484;
	this.instance_11.compositeOperation = "multiply";

	this.instance_12 = new lib.Rectangle_20();
	this.instance_12.setTransform(22.1,1.3,1.4357,1.6333,0,0,0,32.9,2.2);
	this.instance_12.alpha = 0.1484;
	this.instance_12.compositeOperation = "multiply";

	this.instance_13 = new lib.CachedBmp_121();
	this.instance_13.setTransform(-25.15,-92.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.1,-135.5,142.39999999999998,475.7);


(lib.Interpolación20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_2
	this.entrar = new lib.Símbolo4();
	this.entrar.name = "entrar";
	this.entrar.setTransform(-32.25,-221.7,1,1,0,0,0,132.2,128.5);
	new cjs.ButtonHelper(this.entrar, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.entrar).wait(1));

	// Capa_1
	this.instance = new lib.fondo();
	this.instance.setTransform(-1067,-1182);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1067,-1182,2045,2336);


(lib.Interpolación9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-414.75,-56.75,0.2804,0.2804);

	this.instance_1 = new lib.Path_18_1();
	this.instance_1.setTransform(-53.95,39.7,1.9951,0.573,0,0,0,3.6,3.9);
	this.instance_1.alpha = 0.6992;
	this.instance_1.compositeOperation = "multiply";

	this.instance_2 = new lib.Path_19();
	this.instance_2.setTransform(45.15,30.2,1.9951,0.573,0,0,0,10,10.1);
	this.instance_2.alpha = 0.6992;
	this.instance_2.compositeOperation = "multiply";

	this.instance_3 = new lib.Path_20();
	this.instance_3.setTransform(-179.85,24.7,1.9951,0.573,0,0,0,3.5,3.5);
	this.instance_3.alpha = 0.6992;
	this.instance_3.compositeOperation = "multiply";

	this.instance_4 = new lib.Path_21();
	this.instance_4.setTransform(-201.65,33.05,1.9951,0.573,0,0,0,8.9,9);
	this.instance_4.alpha = 0.6992;
	this.instance_4.compositeOperation = "multiply";

	this.instance_5 = new lib.Path_22();
	this.instance_5.setTransform(199.55,20.9,1.9951,0.573,0,0,0,6.4,6.5);
	this.instance_5.alpha = 0.6992;
	this.instance_5.compositeOperation = "multiply";

	this.instance_6 = new lib.Path_23();
	this.instance_6.setTransform(226.15,27.3,1.9951,0.573,0,0,0,4,4.2);
	this.instance_6.alpha = 0.6992;
	this.instance_6.compositeOperation = "multiply";

	this.instance_7 = new lib.Path_25();
	this.instance_7.setTransform(-80.6,54.75,1.9951,0.573,0,0,0,11.8,17.4);
	this.instance_7.alpha = 0.6992;
	this.instance_7.compositeOperation = "multiply";

	this.instance_8 = new lib.CachedBmp_117();
	this.instance_8.setTransform(-467.45,59.85,0.2804,0.2804);

	this.instance_9 = new lib.Path_34();
	this.instance_9.setTransform(19.8,42.45,1.9951,0.573,0,0,0,57.4,21.6);
	this.instance_9.alpha = 0.6992;
	this.instance_9.compositeOperation = "multiply";

	this.instance_10 = new lib.Path_35();
	this.instance_10.setTransform(-89.1,44.9,1.9951,0.573,0,0,0,22.7,17.2);
	this.instance_10.alpha = 0.6992;
	this.instance_10.compositeOperation = "multiply";

	this.instance_11 = new lib.Path_39();
	this.instance_11.setTransform(89.55,32.85,1.9951,0.573,0,0,0,25.5,35);
	this.instance_11.alpha = 0.6992;
	this.instance_11.compositeOperation = "multiply";

	this.instance_12 = new lib.Path_40();
	this.instance_12.setTransform(-83.7,35.6,1.9951,0.573,0,0,0,31.4,33.4);
	this.instance_12.alpha = 0.6992;
	this.instance_12.compositeOperation = "multiply";

	this.instance_13 = new lib.Path_41();
	this.instance_13.setTransform(-197.85,44.75,1.9951,0.573,0,0,0,64,18.7);
	this.instance_13.alpha = 0.6992;
	this.instance_13.compositeOperation = "multiply";

	this.instance_14 = new lib.CachedBmp_116();
	this.instance_14.setTransform(-325.6,16.3,0.2804,0.2804);

	this.instance_15 = new lib.Path_43();
	this.instance_15.setTransform(196.3,40.35,1.9951,0.573,0,0,0,79,21.8);
	this.instance_15.alpha = 0.6992;
	this.instance_15.compositeOperation = "multiply";

	this.instance_16 = new lib.CachedBmp_115();
	this.instance_16.setTransform(38.65,12,0.2804,0.2804);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-467.4,-56.7,934.5,121.2);


(lib.Interpolación5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.ENTRAR2 = new lib.Símbolo9();
	this.ENTRAR2.name = "ENTRAR2";
	this.ENTRAR2.setTransform(95.75,0.55,1,0.9994,0,0,0,81,41.6);
	new cjs.ButtonHelper(this.ENTRAR2, 0, 1, 2);

	this.inicio = new lib.Símbolo3();
	this.inicio.name = "inicio";
	this.inicio.setTransform(-95.7,-0.45,0.7663,0.534,0,0,0,105.7,77.8);
	new cjs.ButtonHelper(this.inicio, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.inicio},{t:this.ENTRAR2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176.7,-42,353.5,84.2);


(lib.Interpolación3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.ENTRAR2 = new lib.Símbolo9();
	this.ENTRAR2.name = "ENTRAR2";
	this.ENTRAR2.setTransform(95.75,0.55,1,0.9994,0,0,0,81,41.6);
	new cjs.ButtonHelper(this.ENTRAR2, 0, 1, 2);

	this.inicio = new lib.Símbolo3();
	this.inicio.name = "inicio";
	this.inicio.setTransform(-95.7,-0.45,0.7663,0.534,0,0,0,105.7,77.8);
	new cjs.ButtonHelper(this.inicio, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.inicio},{t:this.ENTRAR2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176.7,-42,353.5,84.2);


(lib.Interpolación2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Ellipse_0();
	this.instance.setTransform(-0.6,-0.4,3.1277,1.8921,0,0,0,54.1,106.3);
	this.instance.compositeOperation = "overlay";

	this.instance_1 = new lib.Ellipse_1();
	this.instance_1.setTransform(-0.3,-0.5,3.1277,1.8921,0,0,0,17.2,69.3);
	this.instance_1.compositeOperation = "overlay";

	this.instance_2 = new lib.Ellipse_2();
	this.instance_2.setTransform(-0.45,-0.35,3.1277,1.8921,0,0,0,10.7,42.8);
	this.instance_2.compositeOperation = "overlay";

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(253,202,115,0)","#FDCA73"],[0.039,1],0,60,0,-60).s().p("AhoGoQgsivAAj5QAAj4AsiwQAsivA8AAQA+AAArCvQArCwAAD4QAAD5grCvQgrCwg+AAQg8AAgsiwg");
	this.shape.setTransform(0.6857,7.3731,3.1277,1.8921);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.2,-131.6,107.4,262.2);


(lib.Interpolación1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Ellipse_0();
	this.instance.setTransform(-0.2,-0.7,3.1282,1.8924,0,0,0,54.1,106.3);
	this.instance.compositeOperation = "overlay";

	this.instance_1 = new lib.Ellipse_1();
	this.instance_1.setTransform(0.15,-0.5,3.1282,1.8924,0,0,0,17.2,69.5);
	this.instance_1.compositeOperation = "overlay";

	this.instance_2 = new lib.Ellipse_2();
	this.instance_2.setTransform(-0.15,-0.55,3.1282,1.8924,0,0,0,10.6,42.8);
	this.instance_2.compositeOperation = "overlay";

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(253,202,115,0)","#FDCA73"],[0.039,1],0,60,0,-60).s().p("AhoGoQgsivAAj5QAAj4AsiwQAsivA8AAQA+AAArCvQArCwAAD4QAAD5grCvQgrCwg+AAQg8AAgsiwg");
	this.shape.setTransform(0.178,7.4742,3.1282,1.8924);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-132,107.5,262.3);


(lib.Símbolo1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Interpolación1("synched",0);
	this.instance.setTransform(53.5,131.05);

	this.instance_1 = new lib.Interpolación2("synched",0);
	this.instance_1.setTransform(53.55,91.1,0.603,0.603,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,regX:0.1,regY:0.1,scaleX:0.603,scaleY:0.603,x:53.55,y:91.1},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-0.9,107.5,262.2);


(lib.SmokeClouds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1_copy_copy
	this.instance = new lib.SmokeCloud_Ani("synched",0,false);
	this.instance.setTransform(36.25,108.25,0.6419,0.6272,0,146.9726,-33.029,-178.9,-299.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(25).to({_off:false},0).wait(27).to({startPosition:27},0).to({_off:true},1).wait(118));

	// Layer_1_copy
	this.instance_1 = new lib.SmokeCloud_Ani("synched",0,false);
	this.instance_1.setTransform(36.25,108.05,0.6555,0.6555,0,145.4894,-34.5106,-179.1,-299.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).wait(40).to({startPosition:40},0).to({_off:true},1).wait(118));

	// Layer_1
	this.instance_2 = new lib.SmokeCloud_Ani("synched",0,false);
	this.instance_2.setTransform(80.25,-116.25,0.6555,0.6555,0,160.1883,-19.8117,0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(52).to({startPosition:52},0).to({_off:true},1).wait(118));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.3,-119.7,453.2,285.7);


(lib.Interpolación17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_120();
	this.instance.setTransform(-170.3,-370.35,0.9964,0.9964);

	this.instance_1 = new lib.Path_17();
	this.instance_1.setTransform(-3.7,133.5,2.2269,2.2639,0,37.6783,45.4197,21.7,24.2);
	this.instance_1.compositeOperation = "overlay";

	this.instance_2 = new lib.Path_18();
	this.instance_2.setTransform(-2.55,149.3,2.2269,2.2639,0,37.6783,45.4197,31.8,35.6);
	this.instance_2.compositeOperation = "overlay";

	this.instance_3 = new lib.Símbolo1();
	this.instance_3.setTransform(-1.85,196.15,0.872,1,0,0,0,52.9,131.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.3,-370.3,342.8,696.7);


(lib.Interpolación16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_119();
	this.instance.setTransform(-170.6,-348.7,0.9964,0.9964);

	this.instance_1 = new lib.Símbolo1();
	this.instance_1.setTransform(-1.85,196.15,0.8721,1,0,0,0,52.9,131.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.6,-348.7,342.79999999999995,675.0999999999999);


(lib.Interpolación6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_114();
	this.instance.setTransform(-172.35,-352.6,0.9964,0.9964);

	this.instance_1 = new lib.Path_17();
	this.instance_1.setTransform(-5.75,151.25,2.2269,2.2639,0,37.6783,45.4197,21.7,24.2);
	this.instance_1.compositeOperation = "overlay";

	this.instance_2 = new lib.Path_18();
	this.instance_2.setTransform(-4.6,167.05,2.2269,2.2639,0,37.6783,45.4197,31.8,35.6);
	this.instance_2.compositeOperation = "overlay";

	this.instance_3 = new lib.Símbolo1();
	this.instance_3.setTransform(-1.9,196.15,0.8723,1,0,0,0,53.5,131.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172.3,-352.6,342.70000000000005,679);


(lib.Interpolación8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Interpolación6("synched",0);
	this.instance.setTransform(13.95,241.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-158.4,-110.8,342.8,678.9);


(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_52 = function() {
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(52).call(this.frame_52).wait(1));

	// OBJECTS
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(-603.7,17.95,0.9964,0.9964);

	this.instance_1 = new lib.Path_17();
	this.instance_1.setTransform(-437.1,521.85,2.2269,2.2639,0,37.6783,45.4197,21.7,24.2);
	this.instance_1.compositeOperation = "overlay";

	this.instance_2 = new lib.Path_18();
	this.instance_2.setTransform(-435.95,537.65,2.2269,2.2639,0,37.6783,45.4197,31.8,35.6);
	this.instance_2.compositeOperation = "overlay";

	this.instance_3 = new lib.CachedBmp_126();
	this.instance_3.setTransform(-603.7,17.95,0.9964,0.9964);

	this.instance_4 = new lib.Interpolación16("synched",0);
	this.instance_4.setTransform(-433.75,355.45);
	this.instance_4._off = true;

	this.instance_5 = new lib.Interpolación17("synched",0);
	this.instance_5.setTransform(-441.4,256.6);
	this.instance_5._off = true;

	this.instance_6 = new lib.Interpolación6("synched",0);
	this.instance_6.setTransform(-435.9,-29.8);
	this.instance_6._off = true;

	this.instance_7 = new lib.Interpolación8("synched",0);
	this.instance_7.setTransform(-449.85,-1201.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance_3}]},7).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},11).to({state:[{t:this.instance_6}]},12).to({state:[{t:this.instance_7}]},20).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({_off:true,x:-441.4,y:256.6},11).wait(33));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({_off:false},11).to({_off:true,x:-435.9,y:-29.8},12).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(20).to({_off:false},12).to({_off:true,x:-449.85,y:-1201.1},20).wait(1));

	// Smoke_3
	this.instance_8 = new lib.SmokeClouds("synched",0,false);
	this.instance_8.setTransform(-513.45,499.9,1.1619,1.0958,0,71.5661,-108.4335,51.7,160.2);
	this.instance_8.alpha = 0.6602;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({x:-618.55,y:565.65,alpha:0,startPosition:52},52).wait(1));

	// Smoke_4
	this.instance_9 = new lib.SmokeClouds("synched",0,false);
	this.instance_9.setTransform(-337.85,486.25,1.8545,1.749,-87.3122,0,0,51.6,160.2);
	this.instance_9.alpha = 0.6602;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(2).to({_off:false},0).to({x:-258.65,y:413.9,alpha:0,startPosition:50},50).wait(1));

	// Capa_9
	this.instance_10 = new lib.Interpolación9("synched",0);
	this.instance_10.setTransform(-438.05,547.5,0.3232,0.3795);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({regX:0.1,regY:0.1,scaleX:1,x:-439.6,y:545.6,alpha:1},3).to({regX:0,regY:0,x:-446.2,y:545},2).to({regX:0.1,regY:0.1,scaleY:1.9494,x:-438.25,y:444.55},5).to({startPosition:0},3).to({startPosition:0},1).to({regY:0.2,scaleY:0.7371,x:-438.4,y:519.1,alpha:0.3789},5).to({regY:0.1,scaleY:0.3427,y:545.35,alpha:0},3).to({_off:true},22).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-913.6,-1495.1,942.4,2176.8999999999996);


// stage content:
(lib.index = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,409];
	this.streamSoundSymbolsList[0] = [{id:"Proyectopredeterminado3",startFrame:0,endFrame:410,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Proyectopredeterminado3",0);
		this.InsertIntoSoundStreamData(soundInstance,0,410,1);
		this.stop();
		
		this.inicio.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_2.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_2()
		{
			if (document.documentElement.requestFullscreen) {
		        document.documentElement.requestFullscreen();
		    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
		        document.documentElement.mozRequestFullScreen();
		    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
		        document.documentElement.webkitRequestFullscreen();
		    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
		        document.documentElement.msRequestFullscreen();
		    }
			this.gotoAndPlay(1);
			
		}
		
		this.fondo.entrar.addEventListener("click", function() {
		    const iframe = document.createElement("iframe");
		    iframe.src = "page.html";
		    iframe.style.position = "fixed";
		    iframe.style.top = "0";
		    iframe.style.left = "0";
		    iframe.style.width = "100%";
		    iframe.style.height = "100%";
		    iframe.style.border = "none";
		    iframe.id = "mIframe";
		
		    document.body.appendChild(iframe);
		
		    // Activar fullscreen
		    if (iframe.requestFullscreen) {
		        iframe.requestFullscreen();
				
		    }
		});
		
		this.ENTRAR2.addEventListener("click", function() {
		    const iframe = document.createElement("iframe");
		    iframe.src = "page.html";
		    iframe.style.position = "fixed";
		    iframe.style.top = "0";
		    iframe.style.left = "0";
		    iframe.style.width = "100%";
		    iframe.style.height = "100%";
		    iframe.style.border = "none";
		    iframe.id = "mIframe";
		
		    document.body.appendChild(iframe);
		
		    // Activar fullscreen
		    if (iframe.requestFullscreen) {
		        iframe.requestFullscreen();
				
		    }
		});
	}
	this.frame_409 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(409).call(this.frame_409).wait(1));

	// Capa_3
	this.ENTRAR2 = new lib.Símbolo9();
	this.ENTRAR2.name = "ENTRAR2";
	this.ENTRAR2.setTransform(1441.7,941.25,1,0.9994,0,0,0,81,41.6);
	new cjs.ButtonHelper(this.ENTRAR2, 0, 1, 2);

	this.inicio = new lib.Símbolo3();
	this.inicio.name = "inicio";
	this.inicio.setTransform(1250.25,940.25,0.7663,0.534,0,0,0,105.7,77.8);
	new cjs.ButtonHelper(this.inicio, 0, 1, 2);

	this.instance = new lib.Interpolación3("synched",0);
	this.instance.setTransform(1345.95,940.7);
	this.instance._off = true;

	this.instance_1 = new lib.Interpolación5("synched",0);
	this.instance_1.setTransform(1345.95,1940.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.inicio},{t:this.ENTRAR2}]}).to({state:[{t:this.instance}]},186).to({state:[{t:this.instance_1}]},58).to({state:[]},1).wait(165));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(186).to({_off:false},0).to({_off:true,y:1940.7},58).wait(166));

	// Capa_11
	this.instance_2 = new lib.Interpolación24("synched",0);
	this.instance_2.setTransform(975.25,649.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:1053.25,y:662.15},185).to({startPosition:0},1).to({y:1665.45},58).wait(166));

	// _1684753_4810434_ai
	this.instance_3 = new lib.CachedBmp_113();
	this.instance_3.setTransform(638.65,456.35);

	this.instance_4 = new lib.Símbolo2();
	this.instance_4.setTransform(1319.15,731.6,1.0036,1.0036,0,0,0,74.5,295.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},167).wait(243));

	// _110274_274384_P5OJ64_268_ai
	this.educativo = new lib.Interpolación20("synched",0);
	this.educativo.name = "educativo";
	this.educativo.setTransform(994.4,-67.3);

	this.fondo = new lib.Interpolación20("synched",0);
	this.fondo.name = "fondo";
	this.fondo.setTransform(994.4,-61.9);
	this.fondo._off = true;

	this.educactivo = new lib.Interpolación20("synched",0);
	this.educactivo.name = "educactivo";
	this.educactivo.setTransform(994.4,-59.3);
	this.educactivo._off = true;

	this.timeline.addTween(cjs.Tween.get(this.educativo).to({_off:true,y:-61.9},126).wait(284));
	this.timeline.addTween(cjs.Tween.get(this.fondo).to({_off:false},126).to({_off:true,y:-59.3},61).to({_off:false,x:1002.35,y:966.35},59).wait(164));
	this.timeline.addTween(cjs.Tween.get(this.educactivo).wait(126).to({_off:false},61).to({_off:true,x:1002.35,y:966.35},59).wait(164));

	// stageBackground
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("EiXjhV7MEvHAAAMAAACr3MkvHAAAg");
	this.shape.setTransform(960,540);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EiXjBV8MAAAir3MEvHAAAMAAACr3g");
	this.shape_1.setTransform(960,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(410));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(887.4,-709.3,1093,2829.7);
// library properties:
lib.properties = {
	id: '143C24C3E4E11940972D78D9AFA16FBE',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_118.png?1750552501719", id:"CachedBmp_118"},
		{src:"images/CachedBmp_117.png?1750552501719", id:"CachedBmp_117"},
		{src:"images/fondo.png?1750552501719", id:"fondo"},
		{src:"images/index_atlas_1.png?1750552501570", id:"index_atlas_1"},
		{src:"sounds/dnueve.mp3?1750552501719", id:"dnueve"},
		{src:"sounds/mouseclick290204.mp3?1750552501719", id:"mouseclick290204"},
		{src:"sounds/Proyectopredeterminado3.mp3?1750552501719", id:"Proyectopredeterminado3"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['143C24C3E4E11940972D78D9AFA16FBE'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;