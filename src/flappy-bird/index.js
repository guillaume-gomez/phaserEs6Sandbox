class FlappyBird extends Phaser.Game {

  constructor() {
    super(640, 960, Phaser.AUTO, 'content', null);
    this.game.transparent = true;
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }
}
new FlappyBird();
