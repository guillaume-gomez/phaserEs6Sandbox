class FlappyBird extends Phaser.Game {

  constructor() {
    super(450, 800, Phaser.AUTO, 'content', null);
    //this.state.add('GameState', GameState, false);
    //this.state.start('GameState');
  }
}

new FlappyBird();
