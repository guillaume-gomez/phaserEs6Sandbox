const ASSETS_FOLDER = "res/platformer/";

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#3598db';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // Add the physics engine to all game objects
    this.game.world.enableBody = true;

    // Variable to store the arrow key pressed
    this.cursor = this.game.input.keyboard.createCursorKeys();

    // Create the player in the middle of the game
    this.player = this.game.add.sprite(70, 100, 'player');

    // Add gravity to make it fall
    this.player.body.gravity.y = 600;

    // Create 3 groups that will contain our objects
    this.walls = this.game.add.group();
    this.coins = this.game.add.group();
    this.enemies = this.game.add.group();

    // Design the level. x = wall, o = coin, ! = lava.
    const level = [
        'xxxxxxxxxxxxxxxxxxxxxx',
        '!         !          x',
        '!                 o  x',
        '!         o          x',
        '!                    x',
        '!     o   !    x     x',
        'xxxxxxxxxxxxxxxx!!!!!x',
    ];
    // Create the level by going through the array
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

          // Create a wall and add it to the 'walls' group
          if (level[i][j] == 'x') {
              var wall = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
              this.walls.add(wall);
              wall.body.immovable = true;
          }

          // Create a coin and add it to the 'coins' group
          else if (level[i][j] == 'o') {
              var coin = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
              this.coins.add(coin);
          }

          // Create a enemy and add it to the 'enemies' group
          else if (level[i][j] == '!') {
              var enemy = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'lava');
              this.enemies.add(enemy);
          }
      }
    }
    this.jump = false;
    this.left = this.right = false;

    const fnJumpUp = () => {this.jump = false};
    const fnJumpDown = () => {if (this.player.body.touching.down) this.jump = true};
    this.buttonjump = this.game.add.button(400, 175, 'up', null, this, 0, 1, 0, 1);
    this.buttonjump.fixedToCamera = true;
    this.buttonjump.events.onInputOver.add(fnJumpDown);
    this.buttonjump.events.onInputOut.add(fnJumpUp);
    this.buttonjump.events.onInputDown.add(fnJumpDown);
    this.buttonjump.events.onInputUp.add(fnJumpUp);

    const fnLeftUp = () => {this.left = false};
    const fnLeftDown = () => {this.left = true};
    this.buttonleft = this.game.add.button(50, 175, 'left', null, this, 0, 1, 0, 1);
    this.buttonleft.fixedToCamera = true;
    this.buttonleft.events.onInputOver.add(fnLeftDown);
    this.buttonleft.events.onInputOut.add(fnLeftUp);
    this.buttonleft.events.onInputDown.add(fnLeftDown);
    this.buttonleft.events.onInputUp.add(fnLeftUp);

    const fnRightUp = () => {this.right = false};
    const fnRightDown = () => {this.right = true};
    this.buttonright = this.game.add.button(100, 175, 'right', null, this, 0, 1, 0, 1);
    this.buttonright.fixedToCamera = true;
    this.buttonright.events.onInputOver.add(fnRightDown);
    this.buttonright.events.onInputOut.add(fnRightUp);
    this.buttonright.events.onInputDown.add(fnRightDown);
    this.buttonright.events.onInputUp.add(fnRightUp);
  }

  move() {
    if (this.right) {
      this.player.body.velocity.x = 200;
    }
    else if(this.left) {
      this.player.body.velocity.x = -200;
    }
    else {
      this.player.body.velocity.x = 0;
    }
    // Make the player jump if he is touching the ground
    if (this.jump) {
        this.player.body.velocity.y = -250;
        this.jump = false;
    }
  }

  update() {
    // Make the player and the walls collide
    this.game.physics.arcade.collide(this.player, this.walls);

    // Call the 'takeCoin' function when the player takes a coin
    this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

    // Call the 'restart' function when the player touches the enemy
    this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    this.move();
    // Move the player when an arrow key is pressed
    if (this.cursor.left.isDown) {
      this.left = true;
    }
    if (this.cursor.right.isDown) {
        this.right = true;
    }
    if (this.cursor.left.isUp) {
        this.left = false;
    }
    if (this.cursor.right.isUp) {
        this.right = false;
    }
    // Make the player jump if he is touching the ground
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.jump = true
    }
    else if(this.cursor.up.isUp){
      this.jump = false;
    }
  }

  preload() {
    this.game.load.image('player', ASSETS_FOLDER + 'player.png');
    this.game.load.image('wall', ASSETS_FOLDER + 'wall.png');
    this.game.load.image('coin', ASSETS_FOLDER + 'coin.png');
    this.game.load.image('lava', ASSETS_FOLDER + 'lava.png');

    this.game.load.image('left', ASSETS_FOLDER + 'left.png');
    this.game.load.image('right', ASSETS_FOLDER + 'right.png');
    this.game.load.image('up', ASSETS_FOLDER + 'up.png');
  }

  takeCoin(player, coin) {
    coin.kill();
  }

  restart() {
    this.game.state.start('Game');
  }

  render() {
    //this.game.debug.spriteInfo(this.player, 32, 32);
  }
}

export default GameState;
