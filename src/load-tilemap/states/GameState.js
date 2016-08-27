const PATH = "res/load-tilemap";

class GameState extends Phaser.State {

  create() {
    let map = this.game.add.tilemap('Map1');
    map.addTilesetImage('Desert', 'Tileset');
    map.createLayer('Ground');
  }

  update() {
  }

  preload() {
     this.game.load.tilemap('Map1', PATH + "/my-tilemap.json", null, Phaser.Tilemap.TILED_JSON);
     this.game.load.image('Tileset', PATH + "/tmw_desert_spacing.png");
  }
}

export default GameState;
