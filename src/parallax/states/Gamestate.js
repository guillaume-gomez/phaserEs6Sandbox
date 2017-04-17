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
  }

}

export default GameState;