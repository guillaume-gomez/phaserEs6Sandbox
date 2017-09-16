import Bar from 'object/Bar';
import Ball from 'object/Ball';

const WidthScreen = 800;
const HeightScreen = 600;

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#182d3b';
    this.backgroundGraphics = this.game.add.graphics(0, 0);
    this.backgroundGraphics.lineStyle(2, 0xFF0000, 1);
     for (var y = 0; y < HeightScreen; y += 5 * 2) {
            this.backgroundGraphics.moveTo(this.game.world.centerX, y);
            this.backgroundGraphics.lineTo(this.game.world.centerX, y + 5);
        }
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bar = new Bar(this.game, 200, 20);
    this.bar2 = new Bar(this.game, 200, HeightScreen - 20);
    this.ball = new Ball(this.game, WidthScreen / 2, HeightScreen / 2, -400, -500);
    this.game.add.existing(this.bar);
    this.game.add.existing(this.bar2);
    this.game.add.existing(this.ball);

    this.bar.body.collideWorldBounds = true;
    this.bar2.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.bar.body.velocity.x = 0;
    this.bar.body.velocity.y = 0;
    if (this.cursors.left.isDown)
    {
        this.bar.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.bar.body.velocity.x= 200;
    }

    this.game.physics.arcade.collide(this.ball, this.bar, null, this.updateBall, this);
    this.game.physics.arcade.collide(this.ball, this.bar2, null, this.updateBall, this);

  }

  updateBall(ball, _bar) {
    //this.ball.body.velocity.x = this.ball.body.velocity.x + 10;
    //this.ball.body.velocity.y = this.ball.body.velocity.y + 10;
  }

}

export default GameState;
