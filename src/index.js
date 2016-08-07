import GameState from 'states/GameState';

class Game extends Phaser.Game {

constructor() {
    let map;
    let tileset;
    let layer;
    let player;
    let cursors;
    super(500, 500, Phaser.AUTO, 'content', null);
    //this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

}

new Game();
