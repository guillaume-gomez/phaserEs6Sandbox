import GameState from 'states/GameState';

class Game extends Phaser.Game {

constructor() {
    let map;
    let tileset;
    let layer;
    let player;
    let cursors;
    super(450, 800, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

  gameOver(){
    this.state.start('GameState');
  }

}

new Game();
