import DayCycle from 'objects/DayCycle';

const PATH = "res/parallax/";

const MountainsBackHeight = 894;
const MountainsMid1Height = 770;
const MountainsMid2Height = 482;

const Offset = 200;

class GameState extends Phaser.State {

  create() {
    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //Set the games background colour
    this.game.stage.backgroundColor = '#697e96';

    this.dayCycle = new DayCycle(this.game, 5000);


    let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
    bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
    bgBitMap.ctx.fillStyle = '#b2ddc8';
    bgBitMap.ctx.fill();

    this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

    this.sunSprite = this.game.add.sprite(50, -250, 'sun');
    this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');


    //example of cache this.game.cache.getImage('mountains-back').height (the data is loaded in a parent state)
    this.mountainsBack = this.game.add.tileSprite(0,
        this.game.height - MountainsBackHeight + Offset,
        this.game.width,
        MountainsBackHeight,
        'mountains-back'
    );

    this.mountainsMid1 = this.game.add.tileSprite(0,
        this.game.height - MountainsMid1Height + Offset,
        this.game.width,
        MountainsMid1Height,
        'mountains-mid1'
    );

    this.mountainsMid2 = this.game.add.tileSprite(0,
        this.game.height - MountainsMid2Height + Offset,
        this.game.width,
        MountainsMid2Height,
        'mountains-mid2'
    );

    let backgroundSprites = [
        {sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
        {sprite: this.mountainsBack,    from: 0x2f403b, to: 0x96CCBB},
        {sprite: this.mountainsMid1,    from: 0x283632, to: 0x8BBCAC},
        {sprite: this.mountainsMid2,    from: 0x202b28, to: 0x82AD9D}
    ];

    this.dayCycle.initShading(backgroundSprites);
    this.dayCycle.initSun(this.sunSprite);
    this.dayCycle.initMoon(this.moonSprite);
  }

  update() {
    this.mountainsBack.tilePosition.x -= 0.05;
    this.mountainsMid1.tilePosition.x -= 0.3;
    this.mountainsMid2.tilePosition.x -= 0.75;
  }

  preload() {
    this.game.load.image('mountains-back', PATH + 'mountains-back.png');
    this.game.load.image('mountains-mid1', PATH + 'mountains-mid1.png');
    this.game.load.image('mountains-mid2', PATH + 'mountains-mid2.png');
    this.game.load.image('sun', PATH + 'sun.png');
    this.game.load.image('moon', PATH + 'moon.png');
  }

}

export default GameState;