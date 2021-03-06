import GameState from 'states/GameState';

class P2Physics extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.transparent = false;
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }
}

new P2Physics();
