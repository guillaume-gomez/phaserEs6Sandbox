import Paddle from 'object/Paddle';
import Ball from 'object/Ball';
import {
  WidthScreen,
  HeightScreen,
  BallStartDelay,
  BallRandomStartingAngleLeft,
  BallRandomStartingAngleRight,
  BallVelocity
} from "constants.js";

const paddleLeft_x = 50;
const paddleRight_x = 590;
const paddleVelocity = 400;
const paddleSegmentsMax = 4;
const paddleSegmentHeight = 4;
const paddleSegmentAngle = 15;

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#182d3b';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.orientation = "horizontal";
    this.initMiddleLine();

    this.paddle = new Paddle(this.game, 200, 50);
    this.paddle2 = new Paddle(this.game, 200, HeightScreen - 50);
    this.ball = new Ball(this.game, WidthScreen / 2, HeightScreen / 2, - BallVelocity,  - BallVelocity);
    this.game.add.existing(this.paddle);
    this.game.add.existing(this.paddle2);
    this.game.add.existing(this.ball);

    this.paddle.body.collideWorldBounds = true;
    this.paddle2.body.collideWorldBounds = true;

    //this.startDemo();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  }

  initMiddleLine() {
    this.backgroundGraphics = this.game.add.graphics(0, 0);
    this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);
    if(this.orientation === "horizontal") {
      for (var x = 0; x < WidthScreen; x += 5 * 2) {
        this.backgroundGraphics.moveTo(x, this.game.world.centerY);
        this.backgroundGraphics.lineTo(x + 5, this.game.world.centerY);
      }
    } else {
      for (var y = 0; y < HeightScreen; y += 5 * 2) {
        this.backgroundGraphics.moveTo(this.game.world.centerX, y);
        this.backgroundGraphics.lineTo(this.game.world.centerX, y + 5);
      }
    }
  }

  update() {
    this.paddle.body.velocity.x = 0;
    this.paddle.body.velocity.y = 0;
    this.paddle2.body.velocity.x = 0;
    this.paddle2.body.velocity.y = 0;


    if (this.cursors.left.isDown)
    {
        this.paddle.body.velocity.x = -500;
    }
    else if (this.cursors.right.isDown)
    {
        this.paddle.body.velocity.x= 500;
    }

    if (this.qKey.isDown)
    {
        this.paddle2.body.velocity.x = -500;
    }
    else if (this.dKey.isDown)
    {
        this.paddle2.body.velocity.x= 500;
    }

    this.game.physics.arcade.collide(this.ball, this.paddle, null, this.updateBall, this);
    this.game.physics.arcade.collide(this.ball, this.paddle2, null, this.updateBall, this);

  }

  updateBall(ball, paddle) {
    let returnAngle = 0;
    const direction = this.orientation === "vertical" ? "y" : "x";
    let segmentHit = Math.floor( (ball[direction] - paddle[direction]) / paddleSegmentHeight);

    if (segmentHit >= paddleSegmentsMax) {
      segmentHit = paddleSegmentsMax - 1;
    } else if (segmentHit <= -paddleSegmentsMax) {
      segmentHit = -(paddleSegmentsMax - 1);
    }

    if(this.orientation === "vertical") {
      //left paddle
      if (paddle.x < WidthScreen * 0.5) {
        returnAngle = segmentHit * paddleSegmentAngle;
        this.game.physics.arcade.velocityFromAngle(returnAngle, BallVelocity, this.ball.body.velocity);
      } else {
        returnAngle = 180 - (segmentHit * paddleSegmentAngle);
        if (returnAngle > 180) {
            returnAngle -= 360;
        }
        this.game.physics.arcade.velocityFromAngle(returnAngle, BallVelocity, this.ball.body.velocity);
      }
    } else { // horizontal
      // upper paddle
      if (paddle.y < HeightScreen * 0.5) {
        returnAngle = -90 + segmentHit * paddleSegmentAngle;
        this.game.physics.arcade.velocityFromAngle(returnAngle, BallVelocity, this.ball.body.velocity);
      } else {
        returnAngle = 90 - (segmentHit * paddleSegmentAngle);
        this.game.physics.arcade.velocityFromAngle(returnAngle, BallVelocity, this.ball.body.velocity);
      }
    }
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
