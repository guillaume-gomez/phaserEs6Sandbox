class Car extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.game = game;

    //Enable physics on the player
    //game.physics.arcade.enable(this);
  }

  update() {
  }
}

export default Car;