import Bird from 'object/Bird';

class GameState extends Phaser.State {

  create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    this.bird =  new Bird(this.game, 200, 0, 'bird');
    this.game.add.existing(this.bird);
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
  }

  update() {

  }

}

export default GameState;