import RoughSpriteGenerator from 'object/RoughSpriteGenerator';
import Sun from 'object/Sun';
import House from 'object/House';
//import Building from 'object/Building';

class GameState extends Phaser.State {

  create() {
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#a9f1f6";

    this.game.world.setBounds(0, 0, 2500, 600);
    console.log(this.game.world)

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;
    // rough sprite generator
    const rsg = new RoughSpriteGenerator(this.game);

    this.house = new House(this.game, rsg, 50, this.game.height - 32 - 100, 150, 100);
    this.game.add.existing(this.house);

    this.house2 = new House(this.game, rsg, this.game.width - 20, this.game.height - 32 - 150, 100, 150);
    this.game.add.existing(this.house2);

    this.sun = new Sun(this.game, rsg, 0, 0, 100);
    this.game.add.existing(this.sun);

    this.group = this.game.add.group();
    for(let i=0; i < 50; i++) {
      const rnd = Math.random();
      const x = this.getRandomInt((i * 50), (i + 1) * 50);
      const y = this.getRandomInt(350, 450);
      const config = {
        fill: this.getRandomColor(),
        fillWeight: this.getRandomInt(1, 5)
      }
      let sprite = null;
      if(rnd > 0.5) {
        const radius = this.getRandomInt(10, 25)
        sprite = rsg.getCircleSprite(x, y, radius, config);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        const realRadius = radius + (config.fillWeight|| 0);
        sprite.body.setCircle(realRadius);
      } else {
        const width = this.getRandomInt(20, 50);
        const height = this.getRandomInt(20, 50);
        sprite = rsg.getRectangleSprite(x, y, width, height, config);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
      }
      sprite.body.bounce.setTo (0.80, 0.80);
      sprite.body.collideWorldBounds = true;
      sprite.body.velocity.x = this.getRandomInt(-75, 75);
      this.group.add(sprite);
    }

    this.character = rsg.getRectangleSprite(150, 400, 50, 50, {fillStyle: "solid", fill: "#D84315"});
    this.game.physics.enable(this.character, Phaser.Physics.ARCADE);
    this.character.body.collideWorldBounds = true;
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);

    this.ground = rsg.getRectangleSprite(0, this.game.height - 32 , this.game.world.bounds.width, 30, {fill: "#00A6A6", strokeWidth: 2});
    this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;
    this.game.add.existing(this.ground);



    //this.building = new Building(this.game, rsg, 400, 200, 200, 400);
    //this.game.add.existing(this.building);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  preload() {
  }

  update() {
    this.game.physics.arcade.collide(this.character, this.ground);
    this.game.physics.arcade.collide(this.group, this.ground);

    this.character.body.velocity.x = 0;
    if (this.cursors.left.isDown)
    {
        this.character.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.character.body.velocity.x = 150;
    }

    if (this.jumpButton.isDown && !this.character.body.touching.none)
    {
        this.character.body.velocity.y = -300;
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    //this.game.debug.spriteBounds(this.house)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default GameState;
