import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(500, 200, Phaser.AUTO, 'content', null);
    this.state.add('Game', GameState, false);
    this.state.start('Game');
  }
}

new Game();
