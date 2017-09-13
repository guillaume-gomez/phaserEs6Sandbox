import Bar from 'object/Bar';

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = '#3598db';
    // Start the Arcade physics system (for movements and collisions)
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // Add the physics engine to all game objects
    this.game.world.enableBody = true;

    this.bar = new Bar(this.game, 200, 200);
    this.bar2 = new Bar(this.game, 200, 500);
    this.game.add.existing(this.bar);
    this.game.add.existing(this.bar2);

    this.bar.body.collideWorldBounds = true;
    this.bar2.body.collideWorldBounds = true;

    this.ball.body.bounce.set(1);
  }

  update() {
    this.game.physics.arcade.collide(this.bar, this.ball);
    this.game.physics.arcade.collide(this.bar2, this.ball);
  }

}

export default GameState;
