(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

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

var FlappyBird = function (_Phaser$Game) {
  _inherits(FlappyBird, _Phaser$Game);

  function FlappyBird() {
    _classCallCheck(this, FlappyBird);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlappyBird).call(this, 640, 960, Phaser.AUTO, 'content', null));

    _this.transparent = true;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  _createClass(FlappyBird, [{
    key: 'restart',
    value: function restart() {
      this.state.start('GameState');
    }
  }]);

  return FlappyBird;
}(Phaser.Game);

new FlappyBird();

},{"states/GameState":5}],2:[function(require,module,exports){
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

var Bird = function (_Phaser$Sprite) {
  _inherits(Bird, _Phaser$Sprite);

  function Bird(game, x, y, key, frame) {
    _classCallCheck(this, Bird);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bird).call(this, game, x, y, key, frame));

    _this.width = _this.width / 6.5;
    _this.height = _this.height / 6.5;
    _this.y = game.height / 2 - _this.height / 2;

    _this.game = game;

    //Enable physics on the player
    game.physics.arcade.enable(_this);
    //no rebound after colission
    _this.body.bounce.x = _this.body.bounce.y = 0;
    //rotation in the center
    _this.anchor.setTo(0.5, 0.5);
    _this.birdInJump = false;

    // this.body.setPolygon(
    //               39, 129,
    //               127, 42,
    //               188, 0,
    //               365, 0,
    //               425, 105,
    //               436, 176,
    //               463, 182,
    //               495, 219,
    //               430, 315,
    //               285, 345,
    //               152, 341,
    //               6, 228
    // );
    _this.birdRotatePolygon = 0;

    // On ajoute l'animation qui va permettre à l'oiseau de flotter dans les airs
    _this.tweenFlap = game.add.tween(_this);
    _this.tweenFlap.to({ y: _this.y + 20 }, 400, Phaser.Easing.Quadratic.InOut, true, 0, 10000000000, true);
    // On ajoute l'animation du battement des ailes, animation contenu dans le JSON
    _this.animations.add('fly');
    // On fait démarrer l'animation, avec 8 images par seconde et répétée en boucle
    _this.animations.play('fly', 8, true);
    return _this;
  }

  _createClass(Bird, [{
    key: 'onStart',
    value: function onStart() {
      // Gravité de l'oiseau
      this.body.gravity.y = 2000;
      // Premier saut
      this.body.velocity.y = -600;
      // On note que l'oiseau est dans l'action jump
      this.birdInJump = true;

      this.rotation = -Math.PI / 8;
      this.body.rotation = -Math.PI / 8;
      this.birdRotatePolygon = -Math.PI / 8;

      this.tweenFlap.stop();
      this.animations.stop('fly');
      this.animations.play('fly', 15, true);
    }
  }, {
    key: 'jump',
    value: function jump() {
      if (this.y >= 0) {
        this.birdInJump = true;
        this.body.velocity.y = -600;

        if (this.tweenFall != null) {
          this.tweenFall.stop();
        }
        this.rotation = -Math.PI / 8;
        this.tweenJump = this.game.add.tween(this);
        this.tweenJump.to({ rotation: -Math.PI / 8 }, 70, Phaser.Easing.Quadratic.In, true, 0, 0, true);
        this.animations.play('fly');
        this.animations.frame = 0;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.body.velocity.y > 0 && this.birdInJump) {
        this.birdInJump = false;

        if (this.tweenJump != null) {
          this.tweenJump.stop();
        }
        this.tweenFall = this.game.add.tween(this);
        this.tweenFall.to({ rotation: Math.PI / 2 }, 300, Phaser.Easing.Quadratic.In, true, 200, 0, true);

        this.tweenFall.onStart.add(function () {
          this.animations.stop('fly');
          this.animations.frame = 1;
        }.bind(this));

        this.body.rotation = this.rotation - this.birdRotatePolygon;
        this.birdRotatePolygon += this.rotation - this.birdRotatePolygon;
      }
    }
  }]);

  return Bird;
}(Phaser.Sprite);

exports.default = Bird;

},{}],3:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Pipes = function () {
  function Pipes(game) {
    _classCallCheck(this, Pipes);

    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(40, 'pipe');

    this.pipesEndTop = game.add.group();
    this.pipesEndTop.enableBody = true;
    this.pipesEndTop.createMultiple(4, 'pipeEndTop');

    this.pipesEndBottom = game.add.group();
    this.pipesEndBottom.enableBody = true;
    this.pipesEndBottom.createMultiple(4, 'pipeEndBottom');

    this.pipesToCheckForScore = new Array();
    this.pipesToCheckForAdd = new Array();
  }

  _createClass(Pipes, [{
    key: 'update',
    value: function update(game, ground, scoreManager) {
      if (this.pipesToCheckForAdd.length != 0 && this.pipesToCheckForAdd[0].x + this.pipesToCheckForAdd[0].width / 2 < game.world.width / 2) {
        this.pipesToCheckForAdd.splice(0, 1);
        this.addGroupPipes(game, ground);
        scoreManager.updateScore();
      }
    }
  }, {
    key: 'addGroupPipes',
    value: function addGroupPipes(game, ground) {
      var nbPiecesOfPipes = 12;
      var hole = Math.round(Math.random() * (nbPiecesOfPipes - 7)) + 3;

      for (var i = 0; i <= nbPiecesOfPipes; i++) {
        if (i > hole + 1 || i < hole - 1) {
          this.addPieceOfPipe(game.world.width, game.world.height - ground.height - i * game.world.height / nbPiecesOfPipes, i, hole);
        }
      }
    }
  }, {
    key: 'getFirstAvailable',
    value: function getFirstAvailable(collection) {
      var available = collection.getFirstDead();
      if (!available) {
        available = collection.children.find(function (item) {
          return item.x < 0;
        });
      }
      return available;
    }
  }, {
    key: 'addPieceOfPipe',
    value: function addPieceOfPipe(x, y, i, hole, nbPipe) {
      if (i == hole + 2 || i == hole - 2) {
        var yDiff = 15;
        var pipeEnd = void 0;
        var yPipe = void 0;

        if (i == hole + 2) {
          pipeEnd = this.getFirstAvailable(this.pipesEndTop);
          yPipe = y + yDiff;
        } else {
          pipeEnd = this.getFirstAvailable(this.pipesEndBottom);
          yPipe = y - yDiff;
        }
        pipeEnd.reset(x - 4, yPipe);
        pipeEnd.body.velocity.x = -250;
        pipeEnd.outOfBoundsKill = true;
        pipeEnd.body.immovable = true;
      }

      var pipe = this.getFirstAvailable(this.pipes);
      pipe.reset(x, y);
      pipe.body.velocity.x = -250;
      pipe.outOfBoundsKill = true;
      pipe.body.immovable = true;

      if (i == 0) {
        this.pipesToCheckForScore.push(pipe);
        this.pipesToCheckForAdd.push(pipe);
      }
    }
  }]);

  return Pipes;
}();

exports.default = Pipes;

},{}],4:[function(require,module,exports){
"use strict";

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ScoreManager = function () {
  function ScoreManager(game) {
    _classCallCheck(this, ScoreManager);

    this.score = 0;
    this.posi;
    this.scoreText = game.add.text(0, 100, "0", { font: "60px Arial", fill: "#ffffff" });
    // On replace le score au centre de l'écran
    this.scoreText.x = game.width / 2 - this.scoreText.width / 2;
  }

  _createClass(ScoreManager, [{
    key: "updateScore",
    value: function updateScore() {
      this.score++;
      this.scoreText.text = this.score;
    }
  }]);

  return ScoreManager;
}();

exports.default = ScoreManager;

},{}],5:[function(require,module,exports){
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

var _Bird = require('object/Bird');

var _Bird2 = _interopRequireDefault(_Bird);

var _Pipes = require('object/Pipes');

var _Pipes2 = _interopRequireDefault(_Pipes);

var _ScoreManager = require('object/ScoreManager');

var _ScoreManager2 = _interopRequireDefault(_ScoreManager);

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

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.background = this.game.add.sprite(0, 0, 'background');
      this.background.width = this.game.width;
      this.background.height = this.game.height;

      this.pipeManager = new _Pipes2.default(this.game);

      this.ground = this.game.add.sprite(0, 0, 'ground');
      this.ground.width = this.game.width * 2;
      this.ground.y = this.game.height - this.ground.height;
      this.game.physics.arcade.enable(this.ground);
      this.ground.body.velocity.x = -250;

      this.bird = new _Bird2.default(this.game, 200, 0, 'bird');
      this.game.add.existing(this.bird);
      this.game.input.onTap.add(this.start, this);

      this.scoreManager = new _ScoreManager2.default(this.game);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.load.atlasJSONHash('bird', 'res/bird.png', 'res/bird.json');
      // background
      this.game.load.image('background', 'res/background.png');
      this.game.load.image('ground', 'res/ground.png');
      //pipe
      this.game.load.image('pipe', 'res/pipe.png');
      this.game.load.image('pipeEndTop', 'res/pipe-end-top.png');
      this.game.load.image('pipeEndBottom', 'res/pipe-end-bottom.png');
    }
  }, {
    key: 'update',
    value: function update() {
      this.colissionDetection();
      this.pipeManager.update(this.game, this.ground, this.scoreManager);
      if (this.ground.x + this.ground.width / 2 <= 0) {
        this.ground.x = 0;
      }
      this.bird.update();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.bird.onStart();
      this.game.input.onTap.removeAll();
      this.game.input.onDown.add(this.bird.jump, this.bird);
      var fn = function fn() {
        _this2.pipeManager.addGroupPipes(_this2.game, _this2.ground);
      };
      setTimeout(fn, 1500);
    }
  }, {
    key: 'colissionDetection',
    value: function colissionDetection() {
      this.game.physics.arcade.collide(this.bird, this.ground, this.game.restart, null, this.game);
      this.game.physics.arcade.collide(this.bird, this.pipeManager.pipes, this.game.restart, null, this.game);
      this.game.physics.arcade.collide(this.bird, this.pipeManager.pipesEndTop, this.game.restart, null, this.game);
      this.game.physics.arcade.collide(this.bird, this.pipeManager.pipesEndBottom, this.game.restart, null, this.game);
    }

    // render() {
    //   this.game.debug.body(this.bird);
    // }

  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"object/Bird":2,"object/Pipes":3,"object/ScoreManager":4}]},{},[1])
//# sourceMappingURL=flappy-bird.js.map
