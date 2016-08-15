import { WIDTH, HEIGHT, RES_FOLDER } from "../Constants";

class MainMenu extends Phaser.State {

  create() {
    this.add.sprite(0, 0, 'screen-mainmenu');
    this.gameTitle = this.add.sprite( WIDTH * 0.5, 40, 'title');
    this.gameTitle.anchor.set(0.5,0);
    this.startButton = this.add.button( WIDTH * 0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
    this.startButton.anchor.set(0.5,0);
    this.startButton.input.useHandCursor = true;
  }

  startGame() {
    this.game.state.start('Howto');
  }
}

export default MainMenu;
