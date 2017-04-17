class Weather {

  constructor(game) {
      this.game = game;
  }

  addFog() {
    let fog = this.game.add.bitmapData(this.game.width, this.game.height);

    fog.ctx.rect(0, 0, this.game.width, this.game.height);
    fog.ctx.fillStyle = '#b2ddc8';
    fog.ctx.fill();

    this.fogSprite = this.game.add.sprite(0, 0, fog);
    this.fogSprite.alpha = 0;
    this.game.add.tween(this.fogSprite).to( { alpha: 0.7 }, 6000, null, true);
  }

  removeFog() {
    let fogTween = this.game.add.tween(this.fogSprite).to( { alpha: 0 }, 6000, null, true);
    fogTween.onComplete.add(() => {
        this.fogSprite.kill();
    }, this);
  }

  addRain() {
    let rainParticle = this.game.add.bitmapData(15, 50);

    rainParticle.ctx.rect(0, 0, 15, 50);
    rainParticle.ctx.fillStyle = '#9cc9de';
    rainParticle.ctx.fill();

    this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);

    this.emitter.width = this.game.world.width;
    this.emitter.angle = 10;

    this.emitter.makeParticles(rainParticle);

    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.3;

    this.emitter.setYSpeed(600, 1000);
    this.emitter.setXSpeed(-5, 5);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    this.emitter.start(false, 1600, 5, 0);
  }

  removeRain() {
    this.emitter.kill();
  }

}

export default Weather;