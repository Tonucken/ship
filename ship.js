function Ship(name,len,color) {
	this.name = name;
	this.len = len;
	this.color = color;
	this.posX = 0;
	this.posY = 0;
	this.direction = 0;
	this.positions = new Array();

	for(var i=0; i<this.len; i++) {this.positions[i] = 1;}
}

Ship.prototype.hit = function(x,y) {
	for(var i=0; i<this.len; i++) {
		if(this.direction == 0) {
			if(x==(this.posX) && y==(this.posY + i)) {this.positions[i] = 0; return true;}
		} else {if(x==(this.posX + i) && y==(this.posY)) {this.positions[i] = 0; return true;}}
	} 
	return false;
}

Ship.prototype.remaining = function() {
	var counter = len;
	for(var i=0; i<this.len; i++) {if(this.positions[i] == 1) {counter -= 1;}}
	return counter;
}
