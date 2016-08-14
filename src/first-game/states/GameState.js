import Terrain from 'objects/Terrain';
import Player from 'objects/Player';
import ScoreText from 'objects/ScoreText'

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

    //add new player
    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - (this.spacing * 2 + (3 * this.tileHeight)), 'player');
    this.game.add.existing(this.player);

    //Add a platforms group to hold all of our tiles, and create a bunch of them
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple(250, 'tile');

    let terrain = new Terrain(this.game, this.platforms);
    //Create the inital on screen platforms
    terrain.initPlatforms();
    this.game.time.events.loop(2000, terrain.addPlatform, this);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    const scoreFont = "100px Arial";
    this.scoreText = new ScoreText(this.game, this.game.world.centerX, 100, "0", {font: scoreFont, fill: "#fff"});
    this.game.add.existing(this.scoreText);

  }

  preload() {
    this.game.load.image('tile', 'res/tile.png');
    this.game.load.image('player', 'res/player.png');
  }

  update() {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player, this.platforms);
    //Check if the player is touching the bottom
    //console.log(this.player.body.position)
    if(this.player.body.position.y >= this.game.world.height - this.player.body.height){
        this.game.gameOver();
    }
    this.player.handleMove(this.cursors);
    this.scoreText.render(this.game.score);
  }
}

export default GameState;
