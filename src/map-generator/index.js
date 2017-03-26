import GameState from 'states/GameState';

class MapGenerator extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.mazeCreated = new Phaser.Signal();
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

  listen(Fn) {
    this.mazeCreated.add(Fn, this);
  }

  importFromJson(JSONData)
  {
     this.state.start('GameState',true, false, JSONData);
  }


  currentState() {
    const currentStateName = this.state.current;
    return this.state.states[currentStateName];
  }

  getJSONData() {
    return this.currentState().maze.exportJSON();
  }
}

window.game = new MapGenerator();
