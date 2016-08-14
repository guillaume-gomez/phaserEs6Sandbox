class Terrain {

  constructor(game, platforms) {
    this.game = game;
    this.platforms = platforms;
    this.addPlatform = this.addPlatform.bind(this);
  }

  addTile(x, y){
    //Get a tile that is not currently on screen
    let tile = this.platforms.getFirstDead();

    //Reset it to the specified coordinates
    tile.reset(x, y);
    tile.body.velocity.y = 150;
    tile.body.immovable = true;

    //When the tile leaves the screen, kill it
    tile.checkWorldBounds = true;
    tile.outOfBoundsKill = true;
  }

  addPlatform(y){
    //If no y position is supplied, render it just outside of the screen
    if(typeof(y) == "undefined"){
        y = -this.game.tileHeight;
    }
    //Work out how many tiles we need to fit across the whole screen
    var tilesNeeded = Math.ceil(this.game.world.width / this.game.tileWidth);

    //Add a hole randomly somewhere
    var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;

    //Keep creating tiles next to each other until we have an entire row
    //Don't add tiles where the random hole is
    for (var i = 0; i < tilesNeeded; i++){
        if (i != hole && i != hole + 1){
            this.addTile(i * this.game.tileWidth, y);
        }
    }
  }
}

export default Terrain;