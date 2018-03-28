import RoughSpriteGenerator from 'object/RoughSpriteGenerator';

class GameState extends Phaser.State {

  create() {
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#4488AA";

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    // rough sprite generator
    const rsg = new RoughSpriteGenerator(this.game);

    this.sprite = rsg.getRectangleSprite(100, 20, 128, 128);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.game.add.existing(this.sprite);

    this.sprite2 = rsg.getCircleSprite(300, 200, 100);
    this.game.physics.enable(this.sprite2, Phaser.Physics.ARCADE);
    this.game.add.existing(this.sprite2);

    this.ground = rsg.getRectangleSprite(0, this.game.height - 32 , this.game.width, 30);
    this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;
    this.game.add.existing(this.ground);


    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  preload() {
  }

  update() {
    this.sprite.body.velocity.x = 0;
    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }
    this.game.physics.arcade.collide(this.sprite, this.ground);
    this.game.physics.arcade.collide(this.sprite2, this.ground);
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    /*this.game.debug.body(this.ground);*/
  }
}

export default GameState;
