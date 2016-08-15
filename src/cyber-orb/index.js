import GameState from 'states/GameState';
import Boot from "states/Boot";
import Preloader from "states/Preloader";
import MainMenu from "states/MainMenu";

import { WIDTH, HEIGHT} from "Constants";

class Game extends Phaser.Game {

  constructor() {
    super(WIDTH, HEIGHT, Phaser.AUTO, 'content', null);
    this.state.add('Game', GameState, false);
    this.state.add('Boot', Boot, false);
    this.state.add('Preloader', Preloader, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.start('Boot');
  }
}

new Game();
