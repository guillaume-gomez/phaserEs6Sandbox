class Player extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    //Set the players anchor point to be in the middle horizontally
    this.anchor.setTo(0.5, 1.0);

    //Enable physics on the player
    game.physics.arcade.enable(this);

    //Make the player fall by applying gravity
    this.body.gravity.y = 2000;

    //Make the player collide with the game boundaries
    this.body.collideWorldBounds = true;

    //Make the player bounce a little
    this.body.bounce.y = 0.1;
  }

}

export default Player;