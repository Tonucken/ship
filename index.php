<?php $title='Battleship'; include(__DIR__ . '/../mall/header.php'); ?>

<h1>Projekt/examination</h1>

<div id='flash'>
  <h3>Sänka skepp</h3>
  <p>Spelet går ut på att du ska sänka motståndarens alla skepp innan dina egna sänks. Du och datorn spelar på varsin separat spelplan. 
  Det är dock samma canvas som används, och växlar mellan era respektive vyer när du klickar dig framåt.<br>
  Ljusblått representerar havet, dina båtar är röda, miss ger en vit ruta och träff blir en svart ruta.</p>
  
  <span style="float:right">
  █ Minesweeper<br>
  █ 4 st.<br><br>
  
  █ Frigate<br>
  █ 4 st. <br>
  █ <br><br>
  
  █ <br>
  █ Cruiser<br>
  █ 2 st.<br>
  █ <br><br>
  
  █ <br>
  █ Battleship<br>
  █ 1 st.<br>
  █ <br>
  █ <br>
  </span>
  
  <canvas id="boardCanvas" width="500" height="500"></canvas>
  <form>
    <p> <input type="button" id="startGame" value="Start Game">	</p>
  </form>
  
  <div id="myContainer"></div>
  <script src="battleship.js"></script>
  <script src="board.js"></script>
  <script src="ship.js"></script>
  <script src="player.js"></script>
</div> <!-- flash -->
 
<?php $path=__DIR__; include(__DIR__ . '/../mall/footer.php'); ?>
