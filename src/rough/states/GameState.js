import RoughSpriteGenerator from 'object/RoughSpriteGenerator';

class GameState extends Phaser.State {

  create() {
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#4488AA";

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    // rough sprite generator
    const rsg = new RoughSpriteGenerator(this.game);

    this.character = rsg.getRectangleSprite(100, 20, 50, 50);
    this.game.physics.enable(this.character, Phaser.Physics.ARCADE);
    this.game.add.existing(this.character);

    this.group = this.game.add.group();
    for(let i=0; i< 20; i++) {
      const rnd = Math.random();
      const x = this.getRandomInt(0, this.game.width);
      const y = this.getRandomInt(0, 100);
      let sprite = null;
      if(rnd > 0.5) {
        const radius = this.getRandomInt(20, 50)
        sprite = rsg.getCircleSprite(x, y, radius);
      } else {
        const width = this.getRandomInt(20, 50);
        const height = this.getRandomInt(20, 50);
        sprite = rsg.getRectangleSprite(x, y, width, height);
      }
      this.group.add(sprite);
    }
    //this.circle = rsg.getCircleSprite(300, 200, 30);
    this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
    //this.game.add.existing(this.sprite2);

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
    this.character.body.velocity.x = 0;
    if (this.cursors.left.isDown)
    {
        this.character.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.character.body.velocity.x = 150;
    }
    this.game.physics.arcade.collide(this.character, this.ground);
    this.game.physics.arcade.collide(this.group, this.ground);
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    /*this.game.debug.body(this.ground);*/
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default GameState;
