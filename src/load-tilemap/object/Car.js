const OFFSET = 90;
class Car extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.game = game;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.angle = OFFSET;
  }

  update() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.body.angularVelocity = 0;

    if (this.cursors.left.isDown)
    {
        this.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.body.angularVelocity = 200;
    }

    if (this.cursors.up.isDown)
    {
        this.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.angle - OFFSET, 300));
    }
  }
}

export default Car;