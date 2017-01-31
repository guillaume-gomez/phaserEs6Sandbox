class Character extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    game.physics.enable(this);
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown)
    {
        this.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.body.velocity.x = 200;
    }

    if (this.cursors.up.isDown)
    {
        this.body.velocity.y = -200;
    }
    else if (this.cursors.down.isDown) {
        this.body.velocity.y = 200;
    }
  }
}

export default Character;