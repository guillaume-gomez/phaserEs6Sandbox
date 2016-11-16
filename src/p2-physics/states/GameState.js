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

    // player = game.add.sprite(100, 200, 'dude');
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('turn', [4], 20, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);

    //this.game.physics.p2.enable(player);
    
    //player.body.fixedRotation = true;
    // player.body.setMaterial(characterMaterial);

    //this.game.camera.follow(player);

    //this.cursors = game.input.keyboard.createCursorKeys();
    //this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
   
  }

  preload() {
    this.game.load.tilemap('map', PATH + 'collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('ground_1x1', PATH + 'ground_1x1.png');
    this.game.load.image('walls_1x2', PATH + 'walls_1x2.png');
    this.game.load.image('tiles2', PATH +'tiles2.png');
    this.game.load.spritesheet('dude', PATH + 'dude.png', 32, 48);
  }

  render() {
    //NOTHING TO DO RIGHT NOW
  }
}

export default GameState;

/*

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;

var map;
var layer;

function create() {

    

}

function update() {

    if (cursors.left.isDown)
    {
        player.body.moveLeft(200);

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        player.body.velocity.x = 0;

        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump())
    {
        player.body.moveUp(300);
        jumpTimer = game.time.now + 750;
    }

}

function checkIfCanJump() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === player.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    
    return result;

}

function render() {

}*/