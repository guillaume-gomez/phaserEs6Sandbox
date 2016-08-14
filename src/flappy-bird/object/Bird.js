class Bird extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.width = this.width / 6.5;
    this.height = this.height / 6.5;
    this.y = game.height / 2 - this.height / 2;

    //Enable physics on the player
    game.physics.arcade.enable(this);
    //no rebound after colission
    this.body.bounce.x = this.body.bounce.y = 0;
    //rotation in the center
    this.anchor.setTo(0.5, 0.5);
    this.birdInJump = false;


    // On ajoute l'animation qui va permettre à l'oiseau de flotter dans les airs
    this.tweenFlap = game.add.tween(this);
    this.tweenFlap.to({ y: this.y + 20}, 400, Phaser.Easing.Quadratic.InOut, true, 0, 10000000000, true);

    // On ajoute l'animation du battement des ailes, animation contenu dans le JSON
    this.animations.add('fly');
    // On fait démarrer l'animation, avec 8 images par seconde et répétée en boucle
    this.animations.play('fly', 8, true);

  }
}

export default Bird;