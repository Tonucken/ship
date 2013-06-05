function Board(x,y,context) {
	this.x = x;
	this.y = y;
	this.context = context;
	this.board = Array(this.x);
	for(var i = 0; i < this.x; i++) {this.board[i] = new Array(this.y); for(var j=0; j<this.y; j++) {this.board[i][j] = 2;}}
}

Board.prototype.draw = function() {
	for(var i=0; i<this.x; i++) {
		for(var j=0; j<this.y; j++) {
			this.context.fillStyle = colors[this.board[i][j]];
			this.context.fillRect(
				(pixelSize*i)+this.board[i][j], 
				(pixelSize*j)+this.board[i][j], 
				pixelSize-(this.board[i][j]*2),
				pixelSize-(this.board[i][j]*2));
		}
	}
}

Board.prototype.hide_draw = function() {
	for(var i=0; i<this.x; i++) {
		for(var j=0; j<this.y; j++) {
			if(this.board[i][j] != 1) {
				this.context.fillStyle = colors[this.board[i][j]];
				this.context.fillRect(
					(pixelSize*i)+this.board[i][j], 
					(pixelSize*j)+this.board[i][j], 
					pixelSize-(this.board[i][j]*2),
					pixelSize-(this.board[i][j]*2));
			} else {
				this.context.fillStyle = colors[2];
				this.context.fillRect(
					(pixelSize*i)+2, 
					(pixelSize*j)+2, 
					pixelSize-(2*2),
					pixelSize-(2*2));
			}
		}
	}
}
