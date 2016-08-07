(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var map = void 0;
        var tileset = void 0;
        var layer = void 0;
        var player = void 0;
        var cursors = void 0;

        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 500, 500, Phaser.AUTO, 'content', null));

        _this.state.add('GameState', _GameState2.default, false);
        _this.state.start('GameState');
        return _this;
    }

    return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":3}],2:[function(require,module,exports){
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

var RainbowText = function (_Phaser$Text) {
	_inherits(RainbowText, _Phaser$Text);

	function RainbowText(game, x, y, text) {
		_classCallCheck(this, RainbowText);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RainbowText).call(this, game, x, y, text, { font: "45px Arial", fill: "#ff0044", align: "center" }));

		_this._speed = 125; //ms
		_this._colorIndex = 0;
		_this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];

		_this.colorize();
		_this.startTimer();

		_this.game.stage.addChild(_this);

		return _this;
	}

	_createClass(RainbowText, [{
		key: "startTimer",
		value: function startTimer() {
			this.game.time.events.loop(this._speed, this.colorize, this).timer.start();
		}
	}, {
		key: "colorize",
		value: function colorize() {

			for (var i = 0; i < this.text.length; i++) {

				if (this._colorIndex === this._colors.length) {
					this._colorIndex = 0;
				}

				this.addColor(this._colors[this._colorIndex], i);
				this._colorIndex++;
			}
		}
	}]);

	return RainbowText;
}(Phaser.Text);

exports.default = RainbowText;

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

var _RainbowText = require('objects/RainbowText');

var _RainbowText2 = _interopRequireDefault(_RainbowText);

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
      console.log(this);
      // adding the "level" tilemap created at line 27 to the game
      this.map = this.game.add.tilemap("level");
      // // adding the "tiles" tileset created at line 30 to the game
      this.map.addTilesetImage('toto', "tile");
      // // this is the way we tell the script every tile in our engine needs to be checked
      // // for collision. This way all tiles are solid
      //this.tileset.setCollisionRange(0, this.tileset.total-1, true, true, true, true);
      // // now we need to create a game layer, and assign it a tile set and a map
      this.layer = new Phaser.TilemapLayer(this.game, this.map, 0, 640, 480);
      this.layer.resizeWorld();
      //let layer = this.game.add.tilemapLayer(0, 0, 640, 480, this.tileset, map, 0);
      // // finally we create the player placing "hero" instance at x=32, y=416
      this.player = this.game.add.sprite(32, 416, "hero");
      // // this is the gravity applied to the player
      this.game.physics.arcade.enable(this.player);
      this.player.body.gravity.y = 8;
      this.player.body.collideWorldBounds = true;

      // // the fastest way to create game controls is "createCursorKeys" method
      // // which automatically assigns up, down, left and right movement to
      // // arrow keys
      // cursors = game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'preload',
    value: function preload() {
      console.log("preload");
      this.game.load.tilemap("level", "res/level.json", null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image("tile", "res/tiles.png");
      this.game.load.image("hero", "res/hero.png");
    }
  }, {
    key: 'update',
    value: function update() {
      //console.log("update");
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/RainbowText":2}]},{},[1])
//# sourceMappingURL=game.js.map
