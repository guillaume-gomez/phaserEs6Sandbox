import Paddle from 'object/Paddle';
import Ball from 'object/Ball';
import Switch from 'object/Switch';
import Hud from 'object/Hud';
import {
  WidthScreen,
  HeightScreen,
  BallStartDelay,
  BallRandomStartingAngleLeft,
  BallRandomStartingAngleRight,
  BallVelocity,
  paddleSegmentsMax,
  paddleSegmentHeight,
  paddleSegmentAngle,
  scoreToWin,
  WidthPaddle,
  HeightPaddle
} from "constants.js";


class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#182d3b';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.orientation = "vertical";
    this.player1Score = 0;
    this.player2Score = 0;
    this.initBoundaries();
    this.initMiddleLine();
    this.initPaddlesPosition();
    this.initSwitch();
    this.ball = new Ball(this.game, WidthScreen / 2, HeightScreen / 2, - BallVelocity,  - BallVelocity);
    this.ball.events.onOutOfBounds.add(this.ballOutOfBounds, this);
    this.game.add.existing(this.ball);

    this.startDemo();

    this.hud = new Hud(this.game, [this.player1Score, this.player2Score]);
    this.game.add.existing(this.hud);

    //setInterval(() => { this.rotate();}, 5000);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  }

  initBoundaries() {
    if(this.orientation === "horizontal") {
      this.game.physics.arcade.checkCollision.left = true;
      this.game.physics.arcade.checkCollision.right = true;
      this.game.physics.arcade.checkCollision.up = false;
      this.game.physics.arcade.checkCollision.down = false;
    } else {
      this.game.physics.arcade.checkCollision.left = false;
      this.game.physics.arcade.checkCollision.right = false;
      this.game.physics.arcade.checkCollision.up = true;
      this.game.physics.arcade.checkCollision.down = true;
    }
  }

  initPaddlesPosition() {
    if(this.orientation === "horizontal") {
      console.log(WidthScreen / 2 - WidthPaddle / 2)
      this.paddle = new Paddle(this.game, WidthScreen / 2, 50, this.orientation);
      this.paddle2 = new Paddle(this.game, WidthScreen / 2 , HeightScreen - 50, this.orientation);
    } else {
      this.paddle = new Paddle(this.game, 50, HeightScreen / 2, this.orientation);
      this.paddle2 = new Paddle(this.game, WidthScreen - 50, HeightScreen / 2, this.orientation);
    }

    this.game.add.existing(this.paddle);
    this.game.add.existing(this.paddle2);

    this.paddle.body.collideWorldBounds = true;
    this.paddle2.body.collideWorldBounds = true;
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

  initSwitch() {
    let maxX = (WidthScreen / 4) * 3;
    let minX =  WidthScreen / 4;
    let maxY = (HeightScreen / 4) * 3;
    let minY = (HeightScreen / 4);

    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    this.switch = new Switch(this.game, x, y);
    this.game.add.existing(this.switch);
  }


  update() {
    this.handleInput();
    this.game.physics.arcade.collide(this.ball, this.paddle, null, this.updateBall, this);
    this.game.physics.arcade.collide(this.ball, this.paddle2, null, this.updateBall, this);
    this.game.physics.arcade.collide(this.ball, this.switch, null, this.rotate, this);

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
      console.log(segmentHit)
      //right paddle
      if (paddle.x > WidthScreen * 0.5) {
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
    this.ball.position.set( WidthScreen / 2, HeightScreen / 2);
    const randomAngle = this.game.rnd.pick(BallRandomStartingAngleRight.concat(BallRandomStartingAngleLeft));
    this.game.physics.arcade.velocityFromAngle(randomAngle, BallVelocity, this.ball.body.velocity);
  }

  rotate() {
    this.switch.kill();
    this.paddle.kill();
    this.paddle2.kill();
    this.backgroundGraphics.destroy();
    //remove old element

    this.orientation = this.orientation === "horizontal" ? "vertical" : "horizontal";
    this.initMiddleLine();
    this.initPaddlesPosition();
    this.initBoundaries();
    this.initSwitch();
  }

  handleInput() {
    this.paddle.body.velocity.x = 0;
    this.paddle.body.velocity.y = 0;
    this.paddle2.body.velocity.x = 0;
    this.paddle2.body.velocity.y = 0;

    if(this.orientation === "horizontal") {
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
          this.paddle2.body.velocity.x = 500;
      }
    } else {
      if (this.zKey.isDown)
      {
          this.paddle2.body.velocity.y = -500;
      }
      else if (this.sKey.isDown)
      {
          this.paddle2.body.velocity.y= 500;
      }

      if (this.cursors.up.isDown)
      {
          this.paddle.body.velocity.y = -500;
      }
      else if (this.cursors.down.isDown)
      {
          this.paddle.body.velocity.y = 500;
      }
    }
  }

  ballOutOfBounds() {
    this.game.time.events.add(Phaser.Timer.SECOND, this.startBall, this);
    const axis = this.orientation === "horizontal" ? "y" : "x";
     if (this.ball[axis] < 0) {
      this.player2Score++;
    } else {
      this.player1Score++;
    }
    this.hud.updateTexts([this.player1Score, this.player2Score]);
  }

}

export default GameState;
