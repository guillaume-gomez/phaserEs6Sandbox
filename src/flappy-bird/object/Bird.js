class Bird extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.width = this.width / 6.5;
    this.height = this.height / 6.5;
    this.y = game.height / 2 - this.height / 2;

    //Enable physics on the player
    game.physics.arcade.enable(this);
    //no rebound after colission
    this.body.bounce.x = this.body.bounce.y = 0;
    //rotation in the center
    this.anchor.setTo(0.5, 0.5);
    this.birdInJump = false;
  }
}

export default Bird;