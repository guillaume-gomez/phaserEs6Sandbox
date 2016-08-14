class ScoreText extends Phaser.Text {

  constructor(game, x, y, text, style) {
    super(game, x, y, text, style);
    this.anchor.setTo(0.5, 0.5);
    this.align = 'center';
  }

  render(score){
    this.text = score;
  }
}

export default ScoreText;