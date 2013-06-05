window.onload = init;
var game;
var colors = ["black","red","lightblue","white"];

pixelSize = 33;

function init() {
	var startGameButton = document.getElementById("startGame");
	startGameButton.onclick = startGame;

	var canvas = document.getElementById("boardCanvas");
	canvas.addEventListener("click", canvasClick, false);

	var context = canvas.getContext("2d");

	game = new Game(1,2,4,4,context);
}

function startGame() {
	game.players[0].drawBoard();
	alert("Såhär ser dina placeringar ut");
	game.clearCanvas();
	game.players[1].drawHideBoard();
	var startGameButton = document.getElementById("startGame");
	startGameButton.style.visibility="hidden";

	var mydiv = document.getElementById("myContainer");
	mydiv.innerHTML = "Börja spelet. Klicka någonstans i canvasen.";
}

function canvasClick(e) {
	var mydiv = document.getElementById("myContainer");
	mydiv.innerHTML = "";
	canvas_x = e.offsetX;
	canvas_y = e.offsetY;
	board_x = Math.floor(canvas_x / pixelSize);
	board_y = Math.floor(canvas_y / pixelSize);

	if(game.current_player == 0) {
		game.clearCanvas();
		game.current_player = (game.current_player+1)%2;
		var flag = true;

		for(var i=0; i<game.players[game.current_player].ships.length; i++) {
			if(game.players[game.current_player].ships[i].hit(board_x,board_y)) {
				game.players[game.current_player].board.board[board_x][board_y] = 0;
				flag = false;
				mydiv.innerHTML += "<p><h3>TRÄFF! Du har träffat ett mål</h3></p>";
				break;
			}
		}
		if(flag) {game.players[game.current_player].board.board[board_x][board_y] = 3;}
		game.players[game.current_player].drawHideBoard();
		mydiv.innerHTML += "Motståndaren spelar (klicka för att se draget)";
	} else {
		if(game.current_player == 1) {
			game.current_player = (game.current_player+1)%2;
			var computer_x = Math.floor((Math.random()*game.dimension));
			var computer_y = Math.floor((Math.random()*game.dimension));

			while(game.players[game.current_player].board.board[computer_x][computer_y] == 0 || game.players[game.current_player].board.board[computer_x][computer_y] == 3) {
				computer_x = Math.floor((Math.random()*game.dimension));
				computer_y = Math.floor((Math.random()*game.dimension));
			}
			game.clearCanvas();

			var flag = true;
			for(var i=0; i<game.players[game.current_player].ships.length; i++) {
				if(game.players[game.current_player].ships[i].hit(computer_x,computer_y)) {
					game.players[game.current_player].board.board[computer_x][computer_y] = 0;
					flag = false;
					mydiv.innerHTML += "<p><h3>TRÄFF! Du har blivit träffad!</h3></p>";
					break;
				}
			}
			
			if(flag) {game.players[game.current_player].board.board[computer_x][computer_y] = 3;}
			game.players[game.current_player].drawBoard()
			game.current_player = -1;
			mydiv.innerHTML += "Motståndaren har spelat (klicka för att se din spelplan)";
		} else {
			if(game.current_player == -1) {
				game.clearCanvas();
				game.current_player = 0;
				game.players[1].drawHideBoard();
				mydiv.innerHTML = "Din tur";
			}
		}
	}
	
	var winner = game.gameover();
	if(winner >= 0) {
		var mydiv = document.getElementById("myContainer");
		mydiv.innerHTML = "GAME OVER!";
		if(winner == 0) {mydiv.innerHTML += "<p>Du vann!</p>"}
		else {mydiv.innerHTML += "<p>Du förlorade!</p>";}

	}
}

function Game(Battleships,Cruisers,Frigates,Minesweepers,context) {
	this.context = context;
	this.players = new Array();
	this.dimension = 15;
	this.players[0] = new Player(Battleships,Cruisers,Frigates,Minesweepers,this.dimension,context);
	this.players[1] = new Player(Battleships,Cruisers,Frigates,Minesweepers,this.dimension,context);
	this.current_player = 0;
}

Game.prototype.gameover = function() {
	for(var i=0; i<this.players.length; i++) {if(this.players[i].availablePositions() == 0) {return i;}}
	return -1;
}

Game.prototype.clearCanvas = function() {this.context.clearRect(0,0,490,490);}
