const PATH = "res/map-generator";

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
  }

  update() {
  }

  preload() {
    this.game.load.image('Character', PATH + 'character.png');
  }
}

export default GameState;
