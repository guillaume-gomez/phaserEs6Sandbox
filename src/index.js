import GameState from 'states/GameState';

class Game extends Phaser.Game {

constructor() {
    let map;
    let tileset;
    let layer;
    let player;
    let cursors;
    super(649, 480, Phaser.AUTO, 'content', null);
    //this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

}

new Game();
