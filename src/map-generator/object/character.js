class Character extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, "Character", 0);
    this.game = game;

    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
    }

    if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;
    }
    else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 200;
    }
  }
}

export default Character;