import Bird from 'object/Bird';
import Pipes from 'object/Pipes';

class GameState extends Phaser.State {

  create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.pipeManager = new Pipes(this.game);

    this.ground = this.game.add.sprite(0, 0, 'ground');
    this.ground.width = this.game.width * 2;
    this.ground.y = this.game.height - this.ground.height;
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.velocity.x = -250;

    this.bird =  new Bird(this.game, 200, 0, 'bird');
    this.game.add.existing(this.bird);
    this.game.input.onTap.add(this.start, this);
  }

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.load.atlasJSONHash('bird', 'res/bird.png', 'res/bird.json');
    // background
    this.game.load.image('background', 'res/background.png');
    this.game.load.image('ground', 'res/ground.png');
    //pipe
    this.game.load.image('pipe', 'res/pipe.png');
    this.game.load.image('pipeEndTop', 'res/pipe-end-top.png');
    this.game.load.image('pipeEndBottom', 'res/pipe-end-bottom.png');
  }

  update() {
    this.colissionDetection();
    this.pipeManager.update(this.game, this.ground);
    if(this.ground.x + this.ground.width / 2 <= 0) {
      this.ground.x = 0;
    }
    this.bird.update();
  }

  start() {
    this.bird.onStart();
    this.game.input.onTap.removeAll();
    this.game.input.onDown.add(this.bird.jump, this.bird);
    const fn = () => { this.pipeManager.addGroupPipes(this.game, this.ground) };
    setTimeout(fn, 1500);

  }

  colissionDetection() {
    this.game.physics.arcade.collide(this.bird, this.ground, this.game.restart, null, this.game);
    this.game.physics.arcade.collide(this.bird, this.pipeManager.pipes, this.game.restart, null, this.game);
    this.game.physics.arcade.collide(this.bird, this.pipeManager.pipesEndTop, this.game.restart, null, this.game);
    this.game.physics.arcade.collide(this.bird, this.pipeManager.pipesEndBottom, this.game.restart, null, this.game);
  }

  // render() {
  //   this.game.debug.body(this.bird);
  // }

}

export default GameState;