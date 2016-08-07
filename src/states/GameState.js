import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

  create() {
    console.log(this);
    // adding the "level" tilemap created at line 27 to the game
    this.map = this.game.add.tilemap("level");
    // // adding the "tiles" tileset created at line 30 to the game
    this.map.addTilesetImage('toto', "tile");
    // // this is the way we tell the script every tile in our engine needs to be checked
    // // for collision. This way all tiles are solid
    //this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
    // // now we need to create a game layer, and assign it a tile set and a map
    this.layer = new Phaser.TilemapLayer(this.game, this.map, 0, 640, 480);
    this.layer.resizeWorld();
    //let layer = this.game.add.tilemapLayer(0, 0, 640, 480, this.tileset, map, 0);
    // // finally we create the player placing "hero" instance at x=32, y=416
    this.player = this.game.add.sprite(32, 416, "hero");
    // // this is the gravity applied to the player
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 8;
    this.player.body.collideWorldBounds = true;

    // // the fastest way to create game controls is "createCursorKeys" method
    // // which automatically assigns up, down, left and right movement to
    // // arrow keys
    // cursors = game.input.keyboard.createCursorKeys();
  }

  preload() {
    console.log("preload");
    this.game.load.tilemap("level", "res/level.json", null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("tile", "res/tiles.png");
    this.game.load.image("hero", "res/hero.png");
  }

  update() {
    //console.log("update");
  }

}

export default GameState;
