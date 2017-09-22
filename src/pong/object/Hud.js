const { WidthScreen } from "../constants.js";
const style = {font: '80px Arial', fill: '#FFFFFF', align: 'center'}
const top = 10;

class Hud extends Phaser.Group {

  constructor(game, scores) {
    super(game);
    this.scoreLeft = game.add.text(WidthScreen * 0.25, top, scores[0], style);
    this.scoreLeft.anchor.set(0.5, 0);

    this.scoreRight = game.add.text(WidthScreen * 0.75, top, scores[1], style);
    this.scoreRight.anchor.set(0.5, 0);

    this.add(this.scoreRight);
    this.add(this.scoreLeft);
  }

  updateTexts(scores) {
    this.scoreLeft.text = scores[0];
    this.scoreRight.text = scores[1];
  }

}

export default Hud;