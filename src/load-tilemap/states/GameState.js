import Car from 'object/Car';
const PATH = "res/load-tilemap";

class GameState extends Phaser.State {

  create() {
    this.map = this.game.add.tilemap('Map1');
    this.map.addTilesetImage('Desert', 'Tileset');
    this.map.createLayer('Ground');
    this.car = new Car(this.game, 200, 200, 'car');
    this.game.add.existing(this.car);
  }

  update() {
  }

  preload() {
     this.game.load.tilemap('Map1', PATH + "/my-tilemap.json", null, Phaser.Tilemap.TILED_JSON);
     this.game.load.image('Tileset', PATH + "/tmw_desert_spacing.png");
     this.game.load.image('car', PATH + "/car.png");
  }
}

export default GameState;
