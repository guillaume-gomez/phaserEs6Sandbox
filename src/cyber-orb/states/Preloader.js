import { RES_FOLDER, WIDTH, HEIGHT } from "../Constants";

class Preloader extends Phaser.State {

  create() {
    this.game.state.start('MainMenu');
  }

  preload() {
    this.preloadBg = this.add.sprite(( WIDTH - 297) * 0.5, ( HEIGHT - 145 ) * 0.5, 'preloaderBg');
    this.preloadBar = this.add.sprite(( WIDTH - 158) * 0.5, ( HEIGHT - 50 ) * 0.5, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('ball', RES_FOLDER + 'img/ball.png');
    this.load.spritesheet('button-start', RES_FOLDER + 'img/button-start.png', 146, 51);

    this.load.image('hole', RES_FOLDER + 'img/hole.png');
    this.load.image('element-w', RES_FOLDER + 'img/element-w.png');
    this.load.image('element-h', RES_FOLDER + 'img/element-h.png');
    this.load.image('panel', RES_FOLDER + 'img/panel.png');
    this.load.image('title', RES_FOLDER + 'img/title.png');
    this.load.image('button-pause', RES_FOLDER + 'img/button-pause.png');
    this.load.image('screen-bg', RES_FOLDER + 'img/screen-bg.png');
    this.load.image('screen-mainmenu', RES_FOLDER + 'img/screen-mainmenu.png');
    this.load.image('screen-howtoplay', RES_FOLDER + 'img/screen-howtoplay.png');
    this.load.image('border-horizontal', RES_FOLDER + 'img/border-horizontal.png');
    this.load.image('border-vertical', RES_FOLDER + 'img/border-vertical.png');

    this.load.spritesheet('button-audio', RES_FOLDER + 'img/button-audio.png', 35, 35);
    this.load.spritesheet('button-start', RES_FOLDER + 'img/button-start.png', 146, 51);
    this.load.audio('audio-bounce', [RES_FOLDER + 'audio/bounce.ogg', RES_FOLDER + 'audio/bounce.mp3', RES_FOLDER + 'audio/bounce.m4a']);
  }
}

export default Preloader;