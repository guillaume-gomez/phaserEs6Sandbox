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

var Parallax = function (_Phaser$Game) {
  _inherits(Parallax, _Phaser$Game);

  function Parallax() {
    _classCallCheck(this, Parallax);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Parallax).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = false;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return Parallax;
}(Phaser.Game);

new Parallax();

},{"states/GameState":2}],2:[function(require,module,exports){
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

var PATH = "res/parallax/";

var MountainsBackHeight = 894;
var MountainsMid1Height = 770;
var MountainsMid2Height = 482;

var Offset = 200;

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      //Enable Arcade Physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      //Set the games background colour
      this.game.stage.backgroundColor = '#697e96';
      this.mountainsBack = this.game.add.tileSprite(0, this.game.height - MountainsBackHeight + Offset, this.game.width, MountainsBackHeight, 'mountains-back');

      this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - MountainsMid1Height + Offset, this.game.width, MountainsMid1Height, 'mountains-mid1');

      this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - MountainsMid2Height + Offset, this.game.width, MountainsMid2Height, 'mountains-mid2');
    }
  }, {
    key: 'update',
    value: function update() {
      this.mountainsBack.tilePosition.x -= 0.05;
      this.mountainsMid1.tilePosition.x -= 0.3;
      this.mountainsMid2.tilePosition.x -= 0.75;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('mountains-back', PATH + 'mountains-back.png');
      this.game.load.image('mountains-mid1', PATH + 'mountains-mid1.png');
      this.game.load.image('mountains-mid2', PATH + 'mountains-mid2.png');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{}]},{},[1])
//# sourceMappingURL=parallax.js.map
