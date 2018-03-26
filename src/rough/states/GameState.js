import RoughSpriteGenerator from 'object/RoughSpriteGenerator';

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    const rsg = new RoughSpriteGenerator(this.game, 128, 128)

    this.sprite = rsg.getRectangleSprite(this.game, 0, 0);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);


    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  preload() {
  }

  update() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.body.velocity.y = -150;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.body.velocity.y = 150;
    }
  }
}

export default GameState;
