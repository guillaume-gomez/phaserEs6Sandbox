import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    let map;
    let tileset;
    let layer;
    let player;
    let cursors;
    super(450, 800, Phaser.AUTO, 'content', null);
    this.score = 0;
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

  gameOver(){
    this.score = 0;
    this.state.start('GameState');
  }

  incrementScore() {
    this.score += 1;
  }

}

new Game();
