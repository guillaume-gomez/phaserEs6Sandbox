const Velocity = 400;

class Character extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.25, 0.25);
    //this.scale.setTo(0.5, 0.5);
    this.cursors = game.input.keyboard.createCursorKeys();
    //this.body.gravity.y = 600;
  }

  update() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
        this.body.velocity.x = -Velocity;
    }
    else if (this.cursors.right.isDown)
    {
        this.body.velocity.x = Velocity;
    }

    if (this.cursors.up.isDown)
    {
        this.body.velocity.y = -Velocity;
    }
    else if (this.cursors.down.isDown) {
        this.body.velocity.y = Velocity;
    }
  }
}

export default Character;