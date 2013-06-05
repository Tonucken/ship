function Player(Battleships,Cruisers,Frigates,Minesweepers,dimension,context) {
	this.ships = new Array();
	this.context = context;

	var newship;
	for (var i=0; i<Battleships; i++)	{newship = new Ship("Battleship",5,"red"); this.ships.push(newship);}
	for (var i=0; i<Cruisers; i++) 		{newship = new Ship("Cruiser",4,"red"); this.ships.push(newship);}
	for (var i=0; i<Frigates; i++) 		{newship = new Ship("Frigate",3,"red"); this.ships.push(newship);}
	for (var i=0; i<Minesweepers; i++) 	{newship = new Ship("Minesweeper",2,"red"); this.ships.push(newship);}

	this.board = new Board(dimension,dimension,this.context);
	this.shipPositions();
}

Player.prototype.shipPositions = function() {
	var posX = 0;
	var posY = 0;
	var rows = new Array();

	for(var i=0; i<this.board.x; i++) {rows[i] = 0;}
	for(var i=0; i<this.ships.length; i++) {
		posY = Math.floor((Math.random()*(this.board.y - this.ships[i].len)));
		var tempx = Math.floor((Math.random()*this.board.x));
		while(rows[tempx] != 0) {tempx = Math.floor((Math.random()*this.board.x));}
		rows[tempx] = 1;
		posX = tempx;
		this.ships[i].posX = posX;
		this.ships[i].posY = posY;
		
		for(var j=0; j<this.ships[i].len; j++){
			if(this.ships[i].direction == 0) {this.board.board[this.ships[i].posX][this.ships[i].posY + j] = 1;}
			else{this.board.board[this.ships[i].posX + j][this.ships[i].posY] = 1;}
		}
	}
}

Player.prototype.drawBoard = function() {this.board.draw();}
Player.prototype.drawHideBoard = function() {this.board.hide_draw();}
Player.prototype.availablePositions = function() {
	var counter = 0;
	for(var i=0; i<this.ships.length; i++) {counter += this.ships[i].remaining();}
	return counter;
}
