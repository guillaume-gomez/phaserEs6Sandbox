import Player from 'objects/Player';
import Box from 'objects/Box';
import Rope from 'objects/Rope';

const PATH = "res/p2-physics/";

class GameState extends Phaser.State {

  create() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.stage.backgroundColor = '#2d2d2d';

    let map = this.game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2');

    let layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 12);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    this.game.physics.p2.convertTilemap(map, layer);

    this.game.physics.p2.restitution = 0.5;
    this.game.physics.p2.gravity.y = 300;

    this.createMaterials();
    this.box = new Box(this.game, 500, 400-95, 'block', 0, this.boxMaterial);
    this.game.add.existing(this.box);

    this.box2 = new Box(this.game, 500, 400, 'block', 0, this.boxMaterial);
    this.game.add.existing(this.box2);

    this.rope = new Rope(this.game, 400, 110, 'chain', 10, 400, 64);
    this.game.add.existing(this.rope);

    this.player = new Player(this.game, 100, 200, 'dude', 0, this.spriteMaterial);
    this.game.add.existing(this.player);

    //this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
    //other materials are defined in each objects

    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  }

  update() {
    this.player.handleMove(this.cursors, this.jumpButton, this.game);
  }

  preload() {
    this.game.load.tilemap('map', PATH + 'collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('ground_1x1', PATH + 'ground_1x1.png');
    this.game.load.image('walls_1x2', PATH + 'walls_1x2.png');
    this.game.load.image('tiles2', PATH +'tiles2.png');
    this.game.load.image('block', PATH + 'block.png');
    this.game.load.spritesheet('dude', PATH + 'dude.png', 32, 48);
    this.game.load.spritesheet('chain', PATH + 'chain.png', 16, 26);
  }

  render() {
    //NOTHING TO DO RIGHT NOW
    this.game.debug.spriteInfo(this.player, 32, 32);
    //this.bodyDebug = new Phaser.Physics.P2.BodyDebug(this.game, this.box);
  }

  createMaterials() {
    this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
    this.spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial');
    this.boxMaterial = this.game.physics.p2.createMaterial('worldMaterial');
  }

}

export default GameState;