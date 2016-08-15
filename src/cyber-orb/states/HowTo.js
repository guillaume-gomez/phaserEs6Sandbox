import { WIDTH, HEIGHT } from "../Constants";

class HowTo extends Phaser.State {

  create() {
    this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
  }

  startGame() {
    this.game.state.start('Game');
  }
}

export default HowTo;