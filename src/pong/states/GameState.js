import Bar from 'object/Bar';
import Ball from 'object/Ball';

const WidthScreen = 800;
const HeightScreen = 600;

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#3598db';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bar = new Bar(this.game, 200, 20);
    this.bar2 = new Bar(this.game, 200, HeightScreen - 20);
    this.ball = new Ball(this.game, WidthScreen / 2, HeightScreen / 2);
    this.game.add.existing(this.bar);
    this.game.add.existing(this.bar2);
    this.game.add.existing(this.ball);

    this.bar.body.collideWorldBounds = true;
    this.bar2.body.collideWorldBounds = true;
  }

  update() {
    this.game.physics.arcade.collide(this.bar, this.ball);
    this.game.physics.arcade.collide(this.bar2, this.ball);
  }

}

export default GameState;
