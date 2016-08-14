class ScoreManager {

  constructor(game) {
    this.score = 0;
    this.posi
    this.scoreText = game.add.text(0, 100, "0", { font: "60px Arial", fill: "#ffffff" });
    // On replace le score au centre de l'écran
    this.scoreText.x = game.width / 2 - this.scoreText.width / 2;
  }


  updateScore() {
    this.score++;
    this.scoreText.text = this.score;
  }

}

export default ScoreManager;
