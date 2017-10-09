import { WidthScreen, HeightScreen, scoreToWin } from "../constants.js";
const style = {font: '80px Arial', fill: '#FFFFFF', align: 'center'}
const styleWinner = {font: '50px Arial', fill: '#FFFFFF', align: 'center'}
const top = 50;
const left = WidthScreen - 80;
const winnerLabel =  "Winner !";

class Hud extends Phaser.Group {

  constructor(game, scores, direction = "vertical") {
    super(game);
    this.switchHub(game, scores, direction);

    this.scoreLeft.anchor.set(0.5, 0.5);
    this.winnerLeft.anchor.set(0.5, 0.5);
    //this.winnerLeft.visible = false;

    this.scoreRight.anchor.set(0.5, 0.5);
    this.winnerRight.anchor.set(0.5, 0.5);
    //this.winnerRight.visible = false;

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

  switchHub(game, scores, direction) {
    if(this.scoreLeft || this.winnerLeft) {
      this.scoreLeft.kill();
      this.winnerLeft.kill();
    }

    if(this.scoreRight || this.winnerRight) {
      this.scoreRight.kill();
      this.winnerRight.kill();
    }

    if(direction === "vertical") {
      this.scoreLeft = game.add.text(WidthScreen * 0.25, top, scores[0], style);
      this.winnerLeft = game.add.text(WidthScreen * 0.25, top + 100, winnerLabel, styleWinner);

      this.scoreRight = game.add.text(WidthScreen * 0.75, top, scores[1], style);
      this.winnerRight = game.add.text(WidthScreen * 0.75, top + 100, winnerLabel, styleWinner);
    } else {
      this.scoreLeft = game.add.text(left, HeightScreen * 0.25, scores[0], style);
      this.winnerLeft = game.add.text(left - 20, HeightScreen * 0.25 + 100, winnerLabel, styleWinner);

      this.scoreRight = game.add.text(left, HeightScreen * 0.75, scores[1], style);
      this.winnerRight = game.add.text(left - 20, HeightScreen * 0.75 + 100, winnerLabel, styleWinner);
    }

  }

}

export default Hud;