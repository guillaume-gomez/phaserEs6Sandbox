import Bar from 'object/Bar';
import Ball from 'object/Ball';

const WidthScreen = 800;
const HeightScreen = 600;
const BallStartDelay = 2;
const BallRandomStartingAngleLeft = [-120, 120];
const BallRandomStartingAngleRight = [-60, 60];
const BallVelocity = -400;

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#182d3b';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.initMiddleLine();

    this.bar = new Bar(this.game, 200, 50);
    this.bar2 = new Bar(this.game, 200, HeightScreen - 50);
    this.ball = new Ball(this.game, WidthScreen / 2, HeightScreen / 2, BallVelocity, BallVelocity);
    this.game.add.existing(this.bar);
    this.game.add.existing(this.bar2);
    this.game.add.existing(this.ball);

    this.bar.body.collideWorldBounds = true;
    this.bar2.body.collideWorldBounds = true;

    //this.startDemo();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  initMiddleLine() {
    this.backgroundGraphics = this.game.add.graphics(0, 0);
    this.backgroundGraphics.lineStyle(2, 0xFF00F0, 1);
    for (var x = 0; x < WidthScreen; x += 5 * 2) {
      this.backgroundGraphics.moveTo(x, this.game.world.centerY);
      this.backgroundGraphics.lineTo(x + 5, this.game.world.centerY);
    }
  }

  update() {
    this.bar.body.velocity.x = 0;
    this.bar.body.velocity.y = 0;
    if (this.cursors.left.isDown)
    {
        this.bar.body.velocity.x = -500;
    }
    else if (this.cursors.right.isDown)
    {
        this.bar.body.velocity.x= 500;
    }

    this.game.physics.arcade.collide(this.ball, this.bar, null, this.updateBall, this);
    this.game.physics.arcade.collide(this.ball, this.bar2, null, this.updateBall, this);

  }

  updateBall(ball, _bar) {
    //this.ball.body.velocity.x = this.ball.body.velocity.x + 10;
    //this.ball.body.velocity.y = this.ball.body.velocity.y + 10;
  }

  startDemo() {
    this.ball.visible = false;
    this.game.time.events.add(Phaser.Timer.SECOND * BallStartDelay, this.startBall, this);
  }

  startBall() {
    this.ball.visible = true;
    const randomAngle = this.game.rnd.pick(BallRandomStartingAngleRight.concat(BallRandomStartingAngleLeft));
    this.game.physics.arcade.velocityFromAngle(randomAngle, BallVelocity, this.ball.body.velocity);
  }

}

export default GameState;
