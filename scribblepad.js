var ScribblePad = function(elementId, options) {
	this.elementId = elementId;
	this.options = options || {};
	this.penDown = false;
	this.init();
};

ScribblePad.prototype.init = function() {
	function bind(func, scope) {
		return function(e) {
			func.call(scope, e);
		};
	};
	this.canvas = document.getElementById(this.elementId);
	this.canvas.addEventListener('mousemove', bind(this.handleEvent, this), false);
	this.canvas.addEventListener('mousedown', bind(this.handleEvent, this), false);
	this.canvas.addEventListener('mouseup', bind(this.handleEvent, this), false);
	this.ctx = this.canvas.getContext('2d');
	this.ctx.lineWidth = this.options.lineWidth || 1;
};

ScribblePad.prototype.handleEvent = function(e) {
	if (e.layerX || e.layerX == 0) { // Firefox, Chrome, Camino
		e._cx = e.layerX;
		e._cy = e.layerY;

    } else if (e.offsetX || e.offsetX == 0) { // Opera
		e._cx = e.offsetX;
		e._cy = e.offsetY;
    }

	if (!this[e.type]) {
		throw Error('No event handler for type: ' + e.type);
	}

	this[e.type](e);
};

ScribblePad.prototype.mousedown = function(e) {
	this.ctx.moveTo(e._cx, e._cy);
	this.ctx.beginPath();
	this.penDown = true;
};

ScribblePad.prototype.mouseup = function(e) {
	this.mousemove(e);
	this.penDown = false;
};

ScribblePad.prototype.mousemove = function(e) {
	if (this.penDown) {
		this.ctx.lineTo(e._cx, e._cy);
		this.ctx.stroke();
	}
};
