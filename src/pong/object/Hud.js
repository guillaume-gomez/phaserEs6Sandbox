import { WidthScreen, scoreToWin } from "../constants.js";
const style = {font: '80px Arial', fill: '#FFFFFF', align: 'center'}
const styleWinner = {font: '50px Arial', fill: '#FFFFFF', align: 'center'}
const top = 10;
const winnerLabel =  "Winner !";

class Hud extends Phaser.Group {

  constructor(game, scores) {
    super(game);
    this.scoreLeft = game.add.text(WidthScreen * 0.25, top, scores[0], style);
    this.scoreLeft.anchor.set(0.5, 0);
    this.winnerLeft = game.add.text(WidthScreen * 0.25, top + 100, winnerLabel, styleWinner);
    this.winnerLeft.anchor.set(0.5, 0.5);
    this.winnerLeft.visible = false;

    this.scoreRight = game.add.text(WidthScreen * 0.75, top, scores[1], style);
    this.scoreRight.anchor.set(0.5, 0);
    this.winnerRight = game.add.text(WidthScreen * 0.75, top + 100, winnerLabel, styleWinner);
    this.winnerRight.anchor.set(0.5, 0.5);
    this.winnerRight.visible = false;

    this.add(this.scoreRight);
    this.add(this.scoreLeft);
  }

  updateTexts(scores) {
    this.scoreLeft.text = scores[0];
    this.scoreRight.text = scores[1];
  }

  makeWinnerVisible(scores) {
    if(scores[0] === scoreToWin) {
      this.winnerLeft.visible = true;
    } else if(scores[1] === scoreToWin) {
      this.winnerRight.visible = true;
    }
  }

  makeWinnerInvisible(scores) {
    this.winnerLeft.visible = false;
    this.winnerRight.visible = false;
  }

}

export default Hud;