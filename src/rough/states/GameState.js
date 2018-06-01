import RoughSpriteGenerator from 'object/RoughSpriteGenerator';
import Sun from 'object/Sun';
import House from 'object/House';
import Building from 'object/Building';

class GameState extends Phaser.State {

  create() {
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#a9f1f6";

    this.game.world.setBounds(0, 0, 1500, 600);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;
    // rough sprite generator
    const rsg = new RoughSpriteGenerator(this.game);

    this.house = new House(this.game, rsg, 50, this.game.height - 32 - 100, 150, 100);
    this.game.add.existing(this.house);

    this.house2 = new House(this.game, rsg, this.game.width - 20, this.game.height - 32 - 150, 150, 150);
    this.game.add.existing(this.house2);

    this.building = new Building(
      this.game,
      rsg,
      250,
      this.game.height - 32 - 400,
      200,
      400,
      {wallConfig: { fill: "rgba(226, 78, 46, 1.0)"}},
      true
    );
    this.game.add.existing(this.building);

    this.building2 = new Building(
      this.game,
      rsg,
      500,
      this.game.height - 32 - 300,
      250,
      300,
      {wallConfig: { fill: "rgba(204, 179, 151, 1.0)"}}
    );
    this.game.add.existing(this.building2);

    this.building3 = new Building(
      this.game,
      rsg,
      this.game.world.bounds.width - 400,
      this.game.height - 32 - 500,
      200,
      500);
    this.game.add.existing(this.building3);

    this.sun = new Sun(this.game, rsg, 0, 0, 75);
    this.sun.fixedToCamera = true;
    this.game.add.existing(this.sun);

    this.cloud = rsg.getPolygonSprite(500, 30, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512,{fill: 'white', strokeWidth: 3, fillWeight: 5});
    this.cloud.scale.setTo(0.45,0.45);
    // add my own attribute
    this.cloud.vel = -0.05;
    this.game.add.existing(this.cloud);

    this.cloud2 = rsg.getPolygonSprite(0, 50, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512,{fill: 'white',  strokeWidth: 3, fillWeight: 5});
    this.cloud2.scale.setTo(0.5,0.5);
    this.cloud2.vel = 0.08;
    this.game.add.existing(this.cloud2);

    this.cloud3 = rsg.getPolygonSprite(700, 10, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512,{fill: 'white',  strokeWidth: 3, fillWeight: 5});
    this.cloud3.scale.setTo(0.35,0.35);
    this.cloud3.vel = 0.1;
    this.game.add.existing(this.cloud3);


    this.group = this.game.add.group();
    for(let i=0; i < 25; i++) {
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

    this.character = rsg.getAnimatedRectangle(100, 450, 50, 75, {
        fill: "#00B0FF",
        roughness: 1.5,
        strokeWidth: 10,
        hachureAngle: 90,
        hachureGap: 5,
        fillWeight: 5,
        strokeWidth: 5
      }, 4);
    this.game.physics.enable(this.character, Phaser.Physics.ARCADE);
    this.character.body.collideWorldBounds = true;
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);

    this.ground = rsg.getRectangleSprite(0, this.game.height - 32 , this.game.world.bounds.width, 30, {fill: "#00A6A6", strokeWidth: 2});
    this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;
    this.game.add.existing(this.ground);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  preload() {
  }

  cloudManagement() {
    [this.cloud, this.cloud2, this.cloud3].forEach(cloud => {
      if(cloud.x + cloud.width > this.game.world.bounds.width) {
        cloud.x = 0;
      } else if(cloud.x + cloud.width < 0) {
        cloud.x = this.game.world.bounds.width - cloud.width;
      } else {
        cloud.x += cloud.vel;
      }
    });
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

    this.cloudManagement();
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
