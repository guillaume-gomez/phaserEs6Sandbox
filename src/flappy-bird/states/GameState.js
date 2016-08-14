import Bird from 'object/Bird';

class GameState extends Phaser.State {

  create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

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
    this.game.stage.scale = Phaser.ScaleManager.SHOW_ALL;
    //this.game.stage.scale.setShowAll();
    window.addEventListener('resize', function () {
        this.game.scale.refresh();
    });
    this.game.scale.refresh();

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
    if(this.ground.x + this.ground.width / 2 <= 0) {
      this.ground.x = 0;
    }
    this.bird.update();

  }

  start() {
    this.bird.onStart();
    this.game.input.onTap.removeAll();
    this.game.input.onDown.add(this.bird.jump, this.bird);

  }

}

export default GameState;