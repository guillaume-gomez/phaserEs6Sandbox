(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WIDTH = exports.WIDTH = 320;
var HEIGHT = exports.HEIGHT = 480;
var RES_FOLDER = exports.RES_FOLDER = "res/cyber-orb/";

},{}],2:[function(require,module,exports){
"use strict";

var _GameState = require("states/GameState");

var _GameState2 = _interopRequireDefault(_GameState);

var _Boot = require("states/Boot");

var _Boot2 = _interopRequireDefault(_Boot);

var _Preloader = require("states/Preloader");

var _Preloader2 = _interopRequireDefault(_Preloader);

var _MainMenu = require("states/MainMenu");

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _HowTo = require("states/HowTo");

var _HowTo2 = _interopRequireDefault(_HowTo);

var _Constants = require("Constants");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _Constants.WIDTH, _Constants.HEIGHT, Phaser.AUTO, 'content', null));

    _this.state.add('Game', _GameState2.default, false);
    _this.state.add('Boot', _Boot2.default, false);
    _this.state.add('Preloader', _Preloader2.default, false);
    _this.state.add('MainMenu', _MainMenu2.default, false);
    _this.state.add('HowTo', _HowTo2.default, false);
    _this.state.start('Boot');
    return _this;
  }

  return Game;
}(Phaser.Game);

new Game();

},{"Constants":1,"states/Boot":3,"states/GameState":4,"states/HowTo":5,"states/MainMenu":6,"states/Preloader":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Boot = function (_Phaser$State) {
  _inherits(Boot, _Phaser$State);

  function Boot() {
    _classCallCheck(this, Boot);

    return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
  }

  _createClass(Boot, [{
    key: 'create',
    value: function create() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.state.start('Preloader');
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.load.image('preloaderBg', _Constants.RES_FOLDER + 'img/loading-bg.png');
      this.load.image('preloaderBar', _Constants.RES_FOLDER + 'img/loading-bar.png');
    }
  }]);

  return Boot;
}(Phaser.State);

exports.default = Boot;

},{"../Constants":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.add.sprite(0, 0, 'screen-bg');
      this.add.sprite(0, 0, 'panel');
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
      this.fontBig = { font: "24px Arial", fill: "#e4beef" };
      this.fontMessage = { font: "24px Arial", fill: "#e4beef", align: "center", stroke: "#320C3E", strokeThickness: 4 };
      this.audioStatus = true;
      this.timer = 0;
      this.totalTimer = 0;
      this.level = 1;
      this.maxLevels = 5;
      this.movementForce = 10;
      this.ballStartPos = { x: _Constants.WIDTH * 0.5, y: 450 };

      this.pauseButton = this.add.button(_Constants.WIDTH - 8, 8, 'button-pause', this.managePause, this);
      this.pauseButton.anchor.set(1, 0);
      this.pauseButton.input.useHandCursor = true;
      this.audioButton = this.add.button(_Constants.WIDTH - this.pauseButton.width - 8 * 2, 8, 'button-audio', this.manageAudio, this);
      this.audioButton.anchor.set(1, 0);
      this.audioButton.input.useHandCursor = true;
      this.audioButton.animations.add('true', [0], 10, true);
      this.audioButton.animations.add('false', [1], 10, true);
      this.audioButton.animations.play(this.audioStatus);
      this.timerText = this.game.add.text(15, 15, "Time: " + this.timer, this.fontBig);
      this.levelText = this.game.add.text(120, 10, "Level: " + this.level + " / " + this.maxLevels, this.fontSmall);
      this.totalTimeText = this.game.add.text(120, 30, "Total time: " + this.totalTimer, this.fontSmall);

      this.hole = this.add.sprite(_Constants.WIDTH * 0.5, 90, 'hole');
      this.physics.enable(this.hole, Phaser.Physics.ARCADE);
      this.hole.anchor.set(0.5);
      this.hole.body.setSize(2, 2);

      this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
      this.ball.anchor.set(0.5);
      this.physics.enable(this.ball, Phaser.Physics.ARCADE);
      this.ball.body.setSize(18, 18);
      this.ball.body.bounce.set(0.3, 0.3);

      this.initLevels();
      this.showLevel(1);
      this.keys = this.game.input.keyboard.createCursorKeys();

      var fn = this.handleOrientation.bind(this);
      window.addEventListener("deviceorientation", fn, true);

      this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

      this.borderGroup = this.add.group();
      this.borderGroup.enableBody = true;
      this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
      this.borderGroup.create(0, 50, 'border-horizontal');
      this.borderGroup.create(0, _Constants.HEIGHT - 2, 'border-horizontal');
      this.borderGroup.create(0, 0, 'border-vertical');
      this.borderGroup.create(_Constants.WIDTH - 2, 0, 'border-vertical');
      this.borderGroup.setAll('body.immovable', true);
      this.bounceSound = this.game.add.audio('audio-bounce');
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.keys.left.isDown) {
        this.ball.body.velocity.x -= this.movementForce;
      } else if (this.keys.right.isDown) {
        this.ball.body.velocity.x += this.movementForce;
      }
      if (this.keys.up.isDown) {
        this.ball.body.velocity.y -= this.movementForce;
      } else if (this.keys.down.isDown) {
        this.ball.body.velocity.y += this.movementForce;
      }
      this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
      this.physics.arcade.collide(this.ball, this.levels[this.level - 1], this.wallCollision, null, this);
      this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);
    }
  }, {
    key: 'initLevels',
    value: function initLevels() {
      this.levels = [];
      this.levelData = [[{ x: 96, y: 224, t: 'w' }], [{ x: 72, y: 320, t: 'w' }, { x: 200, y: 320, t: 'h' }, { x: 72, y: 150, t: 'w' }], [{ x: 64, y: 352, t: 'h' }, { x: 224, y: 352, t: 'h' }, { x: 0, y: 240, t: 'w' }, { x: 128, y: 240, t: 'w' }, { x: 200, y: 52, t: 'h' }], [{ x: 78, y: 352, t: 'h' }, { x: 78, y: 320, t: 'w' }, { x: 0, y: 240, t: 'w' }, { x: 192, y: 240, t: 'w' }, { x: 30, y: 150, t: 'w' }, { x: 158, y: 150, t: 'w' }], [{ x: 188, y: 352, t: 'h' }, { x: 92, y: 320, t: 'w' }, { x: 0, y: 240, t: 'w' }, { x: 128, y: 240, t: 'w' }, { x: 256, y: 240, t: 'h' }, { x: 180, y: 52, t: 'h' }, { x: 52, y: 148, t: 'w' }]];
      for (var i = 0; i < this.maxLevels; i++) {
        var newLevel = this.add.group();
        newLevel.enableBody = true;
        newLevel.physicsBodyType = Phaser.Physics.ARCADE;
        for (var e = 0; e < this.levelData[i].length; e++) {
          var item = this.levelData[i][e];
          newLevel.create(item.x, item.y, 'element-' + item.t);
        }
        newLevel.setAll('body.immovable', true);
        newLevel.visible = false;
        this.levels.push(newLevel);
      }
    }
  }, {
    key: 'showLevel',
    value: function showLevel(level) {
      var lvl = level | this.level;
      if (this.levels[lvl - 2]) {
        this.levels[lvl - 2].visible = false;
      }
      this.levels[lvl - 1].visible = true;
    }
  }, {
    key: 'updateCounter',
    value: function updateCounter() {
      this.timer++;
      this.timerText.setText("Time: " + this.timer);
      this.totalTimeText.setText("Total time: " + (this.totalTimer + this.timer));
    }
  }, {
    key: 'managePause',
    value: function managePause() {
      this.game.paused = true;
      var pausedText = this.add.text(_Constants.WIDTH * 0.5, 250, "Game paused,\ntap anywhere to continue.", this.fontMessage);
      pausedText.anchor.set(0.5);
      this.input.onDown.add(function () {
        pausedText.destroy();
        this.game.paused = false;
      }, this);
    }
  }, {
    key: 'manageAudio',
    value: function manageAudio() {
      this.audioStatus = !this.audioStatus;
      this.audioButton.animations.play(this.audioStatus);
    }
  }, {
    key: 'wallCollision',
    value: function wallCollision() {
      if (this.audioStatus) {
        this.bounceSound.play();
      }
      // Vibration API
      if ("vibrate" in window.navigator) {
        window.navigator.vibrate(100);
      }
    }
  }, {
    key: 'handleOrientation',
    value: function handleOrientation(e) {
      // Device Orientation API
      var x = e.gamma; // range [-90,90], left-right
      var y = e.beta; // range [-180,180], top-bottom
      var z = e.alpha; // range [0,360], up-down
      this.ball.body.velocity.x += x;
      this.ball.body.velocity.y += y * 0.5;
    }
  }, {
    key: 'finishLevel',
    value: function finishLevel() {
      if (this.level >= this.maxLevels) {
        this.totalTimer += this.timer;
        alert('Congratulations, game completed!\nTotal time of play: ' + this.totalTimer + ' seconds!');
        this.game.state.start('MainMenu');
      } else {
        alert('Congratulations, level ' + this.level + ' completed!');
        this.totalTimer += this.timer;
        this.timer = 0;
        this.level++;
        this.timerText.setText("Time: " + this.timer);
        this.totalTimeText.setText("Total time: " + this.totalTimer);
        this.levelText.setText("Level: " + this.level + " / " + this.maxLevels);
        this.ball.body.x = this.ballStartPos.x;
        this.ball.body.y = this.ballStartPos.y;
        this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        this.showLevel();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      //this.game.debug.body(this.ball);
      //this.game.debug.body(this.hole);
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"../Constants":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var HowTo = function (_Phaser$State) {
  _inherits(HowTo, _Phaser$State);

  function HowTo() {
    _classCallCheck(this, HowTo);

    return _possibleConstructorReturn(this, (HowTo.__proto__ || Object.getPrototypeOf(HowTo)).apply(this, arguments));
  }

  _createClass(HowTo, [{
    key: 'create',
    value: function create() {
      this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.game.state.start('Game');
    }
  }]);

  return HowTo;
}(Phaser.State);

exports.default = HowTo;

},{"../Constants":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainMenu = function (_Phaser$State) {
  _inherits(MainMenu, _Phaser$State);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
  }

  _createClass(MainMenu, [{
    key: 'create',
    value: function create() {
      this.add.sprite(0, 0, 'screen-mainmenu');
      this.gameTitle = this.add.sprite(_Constants.WIDTH * 0.5, 40, 'title');
      this.gameTitle.anchor.set(0.5, 0);
      this.startButton = this.add.button(_Constants.WIDTH * 0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
      this.startButton.anchor.set(0.5, 0);
      this.startButton.input.useHandCursor = true;
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.game.state.start('HowTo');
    }
  }]);

  return MainMenu;
}(Phaser.State);

exports.default = MainMenu;

},{"../Constants":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Preloader = function (_Phaser$State) {
  _inherits(Preloader, _Phaser$State);

  function Preloader() {
    _classCallCheck(this, Preloader);

    return _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).apply(this, arguments));
  }

  _createClass(Preloader, [{
    key: 'create',
    value: function create() {
      this.game.state.start('MainMenu');
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.preloadBg = this.add.sprite((_Constants.WIDTH - 297) * 0.5, (_Constants.HEIGHT - 145) * 0.5, 'preloaderBg');
      this.preloadBar = this.add.sprite((_Constants.WIDTH - 158) * 0.5, (_Constants.HEIGHT - 50) * 0.5, 'preloaderBar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('ball', _Constants.RES_FOLDER + 'img/ball.png');
      this.load.spritesheet('button-start', _Constants.RES_FOLDER + 'img/button-start.png', 146, 51);

      this.load.image('hole', _Constants.RES_FOLDER + 'img/hole.png');
      this.load.image('element-w', _Constants.RES_FOLDER + 'img/element-w.png');
      this.load.image('element-h', _Constants.RES_FOLDER + 'img/element-h.png');
      this.load.image('panel', _Constants.RES_FOLDER + 'img/panel.png');
      this.load.image('title', _Constants.RES_FOLDER + 'img/title.png');
      this.load.image('button-pause', _Constants.RES_FOLDER + 'img/button-pause.png');
      this.load.image('screen-bg', _Constants.RES_FOLDER + 'img/screen-bg.png');
      this.load.image('screen-mainmenu', _Constants.RES_FOLDER + 'img/screen-mainmenu.png');
      this.load.image('screen-howtoplay', _Constants.RES_FOLDER + 'img/screen-howtoplay.png');
      this.load.image('border-horizontal', _Constants.RES_FOLDER + 'img/border-horizontal.png');
      this.load.image('border-vertical', _Constants.RES_FOLDER + 'img/border-vertical.png');

      this.load.spritesheet('button-audio', _Constants.RES_FOLDER + 'img/button-audio.png', 35, 35);
      this.load.spritesheet('button-start', _Constants.RES_FOLDER + 'img/button-start.png', 146, 51);
      this.load.audio('audio-bounce', [_Constants.RES_FOLDER + 'audio/bounce.ogg', _Constants.RES_FOLDER + 'audio/bounce.mp3', _Constants.RES_FOLDER + 'audio/bounce.m4a']);
    }
  }]);

  return Preloader;
}(Phaser.State);

exports.default = Preloader;

},{"../Constants":1}]},{},[2])
//# sourceMappingURL=cyber-orb.js.map
