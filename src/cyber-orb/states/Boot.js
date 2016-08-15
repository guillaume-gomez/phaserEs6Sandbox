import { RES_FOLDER } from "../Constants";

class Boot extends Phaser.State {

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('Preloader');
  }

  preload() {
    this.load.image('preloaderBg', RES_FOLDER + 'img/loading-bg.png');
    this.load.image('preloaderBar', RES_FOLDER + 'img/loading-bar.png');
  }
}

export default Boot;
