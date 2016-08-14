import Terrain from 'objects/Terrain';

class GameState extends Phaser.State {

  create() {
    //Get the dimensions of the tile we are using
    this.game.tileWidth = this.game.cache.getImage('tile').width;
    this.game.tileHeight = this.game.cache.getImage('tile').height;
    //The spacing for the initial platforms
    this.game.spacing = 300;
    //Set the background colour to blue
    this.game.stage.backgroundColor = '479cde';

    //Enable the Arcade physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add a platforms group to hold all of our tiles, and create a bunch of them
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple(250, 'tile');

    let terrain = new Terrain(this.game, this.platforms);
    //Create the inital on screen platforms
    terrain.initPlatforms();
    this.game.time.events.loop(2000, terrain.addPlatform, this);
  }

  preload() {
    this.game.load.image('tile', 'res/tile.png');
    this.game.load.image('player', 'res/player.png');
  }

  update() {

  }

}

export default GameState;
