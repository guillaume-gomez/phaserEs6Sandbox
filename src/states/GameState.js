import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

  create() {
    //Get the dimensions of the tile we are using
    this.tileWidth = this.game.cache.getImage('tile').width;
    this.tileHeight = this.game.cache.getImage('tile').height;

    //Set the background colour to blue
    this.game.stage.backgroundColor = '479cde';

    //Enable the Arcade physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add a platforms group to hold all of our tiles, and create a bunch of them
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple(250, 'tile');
  }

  preload() {
    this.game.load.image('tile', 'res/tile.png');
    this.game.load.image('player', 'res/player.png');
  }

  update() {

  }

}

export default GameState;
