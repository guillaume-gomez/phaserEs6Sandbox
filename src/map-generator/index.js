import GameState from 'states/GameState';

class MapGenerator extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.transparent = true;
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }
}

new MapGenerator();
