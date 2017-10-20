(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WidthScreen = exports.WidthScreen = 800;
var HeightScreen = exports.HeightScreen = 600;
var BallStartDelay = exports.BallStartDelay = 2;
var BallRandomStartingAngleLeft = exports.BallRandomStartingAngleLeft = [-120, 120];
var BallRandomStartingAngleRight = exports.BallRandomStartingAngleRight = [-60, 60];
var BallVelocity = exports.BallVelocity = 400;
var paddleSegmentsMax = exports.paddleSegmentsMax = 4;
var paddleSegmentHeight = exports.paddleSegmentHeight = 4;
var paddleSegmentAngle = exports.paddleSegmentAngle = 15;
var scoreToWin = exports.scoreToWin = 10;
var WidthPaddle = exports.WidthPaddle = 100;
var HeightPaddle = exports.HeightPaddle = 20;

},{}],2:[function(require,module,exports){
'use strict';

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

var LoadTilemap = function (_Phaser$Game) {
  _inherits(LoadTilemap, _Phaser$Game);

  function LoadTilemap() {
    _classCallCheck(this, LoadTilemap);

    var _this = _possibleConstructorReturn(this, (LoadTilemap.__proto__ || Object.getPrototypeOf(LoadTilemap)).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return LoadTilemap;
}(Phaser.Game);

new LoadTilemap();

},{"states/GameState":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Radius = 7;
var LineWidth = 3;

var Ball = function (_Phaser$Sprite) {
  _inherits(Ball, _Phaser$Sprite);

  function Ball(game, x, y, velX, velY) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#FDFDFD";

    _classCallCheck(this, Ball);

    var bmd = game.add.bitmapData(Radius * 2, Radius * 2);
    bmd.ctx.beginPath();
    bmd.ctx.arc(Radius, Radius, Radius - LineWidth, 0, 2 * Math.PI, false);
    debugger;
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    bmd.ctx.lineWidth = LineWidth;
    bmd.ctx.strokeStyle = "#BBBBBB";
    bmd.ctx.stroke();

    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, game, x, y, bmd));

    game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.checkWorldBounds = true;
    _this.body.collideWorldBounds = true;
    _this.anchor.set(0.5, 0.5);
    _this.body.velocity.setTo(velX, velY);
    _this.body.bounce.set(1);
    return _this;
  }

  return Ball;
}(Phaser.Sprite);

exports.default = Ball;

},{}],4:[function(require,module,exports){
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

var _constants = require('../constants.js');

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

var style = { font: '80px Arial', fill: '#FFFFFF', align: 'center' };
var styleWinner = { font: '50px Arial', fill: '#FFFFFF', align: 'center' };
var top = 50;
var left = _constants.WidthScreen - 80;
var winnerLabel = "Winner !";

var Hud = function (_Phaser$Group) {
  _inherits(Hud, _Phaser$Group);

  function Hud(game, scores) {
    var orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "vertical";

    _classCallCheck(this, Hud);

    var _this = _possibleConstructorReturn(this, (Hud.__proto__ || Object.getPrototypeOf(Hud)).call(this, game));

    _this.switchHub(game, scores, orientation);

    _this.scoreLeft.anchor.set(0.5, 0.5);
    _this.winnerLeft.anchor.set(0.5, 0.5);
    //this.winnerLeft.visible = false;

    _this.scoreRight.anchor.set(0.5, 0.5);
    _this.winnerRight.anchor.set(0.5, 0.5);
    //this.winnerRight.visible = false;

    _this.add(_this.scoreRight);
    _this.add(_this.scoreLeft);
    return _this;
  }

  _createClass(Hud, [{
    key: 'updateTexts',
    value: function updateTexts(scores) {
      this.scoreLeft.text = scores[0];
      this.scoreRight.text = scores[1];
    }
  }, {
    key: 'makeWinnerVisible',
    value: function makeWinnerVisible(scores) {
      if (scores[0] === _constants.scoreToWin) {
        this.winnerLeft.visible = true;
      } else if (scores[1] === _constants.scoreToWin) {
        this.winnerRight.visible = true;
      }
    }
  }, {
    key: 'makeWinnerInvisible',
    value: function makeWinnerInvisible(scores) {
      this.winnerLeft.visible = false;
      this.winnerRight.visible = false;
    }
  }, {
    key: 'switchHub',
    value: function switchHub(game, scores, orientation) {
      if (this.scoreLeft || this.winnerLeft) {
        this.scoreLeft.kill();
        this.winnerLeft.kill();
      }

      if (this.scoreRight || this.winnerRight) {
        this.scoreRight.kill();
        this.winnerRight.kill();
      }

      if (orientation === "vertical") {
        this.scoreLeft = game.add.text(_constants.WidthScreen * 0.25, top, scores[0], style);
        this.winnerLeft = game.add.text(_constants.WidthScreen * 0.25, top + 100, winnerLabel, styleWinner);

        this.scoreRight = game.add.text(_constants.WidthScreen * 0.75, top, scores[1], style);
        this.winnerRight = game.add.text(_constants.WidthScreen * 0.75, top + 100, winnerLabel, styleWinner);
      } else {
        this.scoreLeft = game.add.text(left, _constants.HeightScreen * 0.25, scores[0], style);
        this.winnerLeft = game.add.text(left - 20, _constants.HeightScreen * 0.25 + 50, winnerLabel, styleWinner);

        this.scoreRight = game.add.text(left, _constants.HeightScreen * 0.75, scores[1], style);
        this.winnerRight = game.add.text(left - 20, _constants.HeightScreen * 0.75 + 50, winnerLabel, styleWinner);
      }

      this.scoreLeft.anchor.set(0.5, 0.5);
      this.winnerLeft.anchor.set(0.5, 0.5);
      this.winnerLeft.visible = false;

      this.scoreRight.anchor.set(0.5, 0.5);
      this.winnerRight.anchor.set(0.5, 0.5);
      this.winnerRight.visible = false;
    }
  }]);

  return Hud;
}(Phaser.Group);

exports.default = Hud;

},{"../constants.js":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require("../constants");

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

var LineWidthPaddle = 5;

function createBmp(game, direction, color) {
    var bmd = direction === "horizontal" ? game.add.bitmapData(_constants.WidthPaddle, _constants.HeightPaddle) : game.add.bitmapData(_constants.HeightPaddle, _constants.WidthPaddle);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = LineWidthPaddle;
    bmd.ctx.strokeStyle = "#FFFFFF";
    if (direction === "horizontal") {
        bmd.ctx.rect(LineWidthPaddle / 2, LineWidthPaddle / 2, _constants.WidthPaddle - LineWidthPaddle, _constants.HeightPaddle - LineWidthPaddle);
    } else {
        bmd.ctx.rect(LineWidthPaddle / 2, LineWidthPaddle / 2, _constants.HeightPaddle - LineWidthPaddle, _constants.WidthPaddle - LineWidthPaddle);
    }
    bmd.ctx.stroke();
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    return bmd;
}

var Paddle = function (_Phaser$Sprite) {
    _inherits(Paddle, _Phaser$Sprite);

    function Paddle(game, x, y) {
        var orientation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "horizontal";
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#E0E0E0";

        _classCallCheck(this, Paddle);

        var bmd = createBmp(game, orientation, color);

        var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, game, x, y, bmd));

        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.anchor.set(0.5, 0.5);
        _this.body.immovable = true;
        return _this;
    }

    return Paddle;
}(Phaser.Sprite);

exports.default = Paddle;

},{"../constants":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var width = 30;

var Switch = function (_Phaser$Sprite) {
  _inherits(Switch, _Phaser$Sprite);

  function Switch(game, x, y) {
    _classCallCheck(this, Switch);

    var bmd = game.add.bitmapData(width, width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, width);
    bmd.ctx.fillStyle = "#FF5252";
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, game, x, y, bmd));

    game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.body.immovable = true;
    return _this;
  }

  return Switch;
}(Phaser.Sprite);

exports.default = Switch;

},{}],7:[function(require,module,exports){
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

var _Paddle = require('object/Paddle');

var _Paddle2 = _interopRequireDefault(_Paddle);

var _Ball = require('object/Ball');

var _Ball2 = _interopRequireDefault(_Ball);

var _Switch = require('object/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Hud = require('object/Hud');

var _Hud2 = _interopRequireDefault(_Hud);

var _constants = require('constants.js');

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

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#182d3b';
      // Start the Arcade physics system (for movements and collisions)
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.orientation = "horizontal";
      this.player1Score = 0;
      this.player2Score = 0;
      this.initBoundaries();
      this.initMiddleLine();
      this.initPaddlesPosition();
      this.initSwitch();
      this.ball = new _Ball2.default(this.game, _constants.WidthScreen / 2, _constants.HeightScreen / 2, -_constants.BallVelocity, -_constants.BallVelocity);
      this.ball.events.onOutOfBounds.add(this.ballOutOfBounds, this);
      this.game.add.existing(this.ball);

      this.hud = new _Hud2.default(this.game, [this.player1Score, this.player2Score], this.orientation);
      this.game.add.existing(this.hud);

      this.start();

      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
      this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    }
  }, {
    key: 'initBoundaries',
    value: function initBoundaries() {
      if (this.orientation === "horizontal") {
        this.game.physics.arcade.checkCollision.left = true;
        this.game.physics.arcade.checkCollision.right = true;
        this.game.physics.arcade.checkCollision.up = false;
        this.game.physics.arcade.checkCollision.down = false;
      } else {
        this.game.physics.arcade.checkCollision.left = false;
        this.game.physics.arcade.checkCollision.right = false;
        this.game.physics.arcade.checkCollision.up = true;
        this.game.physics.arcade.checkCollision.down = true;
      }
    }
  }, {
    key: 'initPaddlesPosition',
    value: function initPaddlesPosition() {
      if (this.orientation === "horizontal") {
        console.log(_constants.WidthScreen / 2 - _constants.WidthPaddle / 2);
        this.paddle = new _Paddle2.default(this.game, _constants.WidthScreen / 2, 50, this.orientation);
        this.paddle2 = new _Paddle2.default(this.game, _constants.WidthScreen / 2, _constants.HeightScreen - 50, this.orientation);
      } else {
        this.paddle = new _Paddle2.default(this.game, 50, _constants.HeightScreen / 2, this.orientation);
        this.paddle2 = new _Paddle2.default(this.game, _constants.WidthScreen - 50, _constants.HeightScreen / 2, this.orientation);
      }

      this.game.add.existing(this.paddle);
      this.game.add.existing(this.paddle2);

      this.paddle.body.collideWorldBounds = true;
      this.paddle2.body.collideWorldBounds = true;
    }
  }, {
    key: 'initMiddleLine',
    value: function initMiddleLine() {
      this.backgroundGraphics = this.game.add.graphics(0, 0);
      this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);
      if (this.orientation === "horizontal") {
        for (var x = 0; x < _constants.WidthScreen; x += 5 * 2) {
          this.backgroundGraphics.moveTo(x, this.game.world.centerY);
          this.backgroundGraphics.lineTo(x + 5, this.game.world.centerY);
        }
      } else {
        for (var y = 0; y < _constants.HeightScreen; y += 5 * 2) {
          this.backgroundGraphics.moveTo(this.game.world.centerX, y);
          this.backgroundGraphics.lineTo(this.game.world.centerX, y + 5);
        }
      }
    }
  }, {
    key: 'initSwitch',
    value: function initSwitch() {
      var maxX = _constants.WidthScreen / 4 * 3;
      var minX = _constants.WidthScreen / 4;
      var maxY = _constants.HeightScreen / 4 * 3;
      var minY = _constants.HeightScreen / 4;

      var x = Math.random() * (maxX - minX) + minX;
      var y = Math.random() * (maxY - minY) + minY;
      this.switch = new _Switch2.default(this.game, x, y);
      this.game.add.existing(this.switch);
    }
  }, {
    key: 'update',
    value: function update() {
      this.handleInput();
      this.game.physics.arcade.collide(this.ball, this.paddle, null, this.updateBall, this);
      this.game.physics.arcade.collide(this.ball, this.paddle2, null, this.updateBall, this);
      if (this.checkOverlap(this.ball, this.switch)) {
        this.rotate();
      }
    }
  }, {
    key: 'checkOverlap',
    value: function checkOverlap(spriteA, spriteB) {
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
  }, {
    key: 'updateBall',
    value: function updateBall(ball, paddle) {
      var returnAngle = 0;
      var direction = this.orientation === "vertical" ? "y" : "x";
      var segmentHit = Math.floor((ball[direction] - paddle[direction]) / _constants.paddleSegmentHeight);

      if (segmentHit >= _constants.paddleSegmentsMax) {
        segmentHit = _constants.paddleSegmentsMax - 1;
      } else if (segmentHit <= -_constants.paddleSegmentsMax) {
        segmentHit = -(_constants.paddleSegmentsMax - 1);
      }

      if (this.orientation === "vertical") {
        console.log(segmentHit);
        //right paddle
        if (paddle.x > _constants.WidthScreen * 0.5) {
          returnAngle = segmentHit * _constants.paddleSegmentAngle;
          this.game.physics.arcade.velocityFromAngle(returnAngle, _constants.BallVelocity, this.ball.body.velocity);
        } else {
          returnAngle = 180 - segmentHit * _constants.paddleSegmentAngle;
          if (returnAngle > 180) {
            returnAngle -= 360;
          }
          this.game.physics.arcade.velocityFromAngle(returnAngle, _constants.BallVelocity, this.ball.body.velocity);
        }
      } else {
        // horizontal
        // upper paddle
        if (paddle.y < _constants.HeightScreen * 0.5) {
          returnAngle = -90 + segmentHit * _constants.paddleSegmentAngle;
          this.game.physics.arcade.velocityFromAngle(returnAngle, _constants.BallVelocity, this.ball.body.velocity);
        } else {
          returnAngle = 90 - segmentHit * _constants.paddleSegmentAngle;
          this.game.physics.arcade.velocityFromAngle(returnAngle, _constants.BallVelocity, this.ball.body.velocity);
        }
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.hud.makeWinnerInvisible();
      this.ball.visible = false;
      this.hud.updateTexts([this.player1Score, this.player2Score]);
      this.game.time.events.add(Phaser.Timer.SECOND * _constants.BallStartDelay, this.startBall, this);
    }
  }, {
    key: 'startBall',
    value: function startBall() {
      this.ball.visible = true;
      this.ball.position.set(_constants.WidthScreen / 2, _constants.HeightScreen / 2);
      var randomAngle = this.game.rnd.pick(_constants.BallRandomStartingAngleRight.concat(_constants.BallRandomStartingAngleLeft));
      this.game.physics.arcade.velocityFromAngle(randomAngle, _constants.BallVelocity, this.ball.body.velocity);
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      this.switch.kill();
      this.paddle.kill();
      this.paddle2.kill();
      this.backgroundGraphics.destroy();
      //remove old element

      this.game.camera.shake(0.05, 100);

      this.orientation = this.orientation === "horizontal" ? "vertical" : "horizontal";
      this.initMiddleLine();
      this.initPaddlesPosition();
      this.initBoundaries();
      this.initSwitch();
      this.hud.switchHub(this.game, [this.player1Score, this.player2Score], this.orientation);
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      this.paddle.body.velocity.x = 0;
      this.paddle.body.velocity.y = 0;
      this.paddle2.body.velocity.x = 0;
      this.paddle2.body.velocity.y = 0;

      if (this.orientation === "horizontal") {
        if (this.cursors.left.isDown) {
          this.paddle.body.velocity.x = -500;
        } else if (this.cursors.right.isDown) {
          this.paddle.body.velocity.x = 500;
        }

        if (this.qKey.isDown) {
          this.paddle2.body.velocity.x = -500;
        } else if (this.dKey.isDown) {
          this.paddle2.body.velocity.x = 500;
        }
      } else {
        if (this.zKey.isDown) {
          this.paddle2.body.velocity.y = -500;
        } else if (this.sKey.isDown) {
          this.paddle2.body.velocity.y = 500;
        }

        if (this.cursors.up.isDown) {
          this.paddle.body.velocity.y = -500;
        } else if (this.cursors.down.isDown) {
          this.paddle.body.velocity.y = 500;
        }
      }
    }
  }, {
    key: 'ballOutOfBounds',
    value: function ballOutOfBounds() {
      var axis = this.orientation === "horizontal" ? "y" : "x";
      if (this.ball[axis] < 0) {
        this.player2Score++;
      } else {
        this.player1Score++;
      }
      this.hud.updateTexts([this.player1Score, this.player2Score]);
      //if the game is over
      if (this.player1Score === _constants.scoreToWin || this.player2Score === _constants.scoreToWin) {
        this.hud.makeWinnerVisible([this.player1Score, this.player2Score]);
        this.player1Score = 0;
        this.player2Score = 0;
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.start, this);
      } else {
        this.game.time.events.add(Phaser.Timer.SECOND, this.startBall, this);
      }
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"constants.js":1,"object/Ball":3,"object/Hud":4,"object/Paddle":5,"object/Switch":6}]},{},[2])
//# sourceMappingURL=pong.js.map
