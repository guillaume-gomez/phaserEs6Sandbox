import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(640, 480, Phaser.AUTO, 'content', null);
    this.state.add('Game', GameState, false);
    this.state.start('Game');
  }
}

new Game();
