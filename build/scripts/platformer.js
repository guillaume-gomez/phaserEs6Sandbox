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

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 500, 200, Phaser.AUTO, 'content', null));

    _this.state.add('Game', _GameState2.default, false);
    _this.state.start('Game');
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
exports.isMobileAndTablet = isMobileAndTablet;
function isMobileAndTablet() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

},{}],3:[function(require,module,exports){
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

var _Constants = require("./Constants.js");

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

var ASSETS_FOLDER = "res/platformer/";

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: "create",
    value: function create() {
      var _this2 = this;

      this.game.stage.backgroundColor = '#3598db';
      // Start the Arcade physics system (for movements and collisions)
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // Add the physics engine to all game objects
      this.game.world.enableBody = true;

      // Variable to store the arrow key pressed
      this.cursor = this.game.input.keyboard.createCursorKeys();

      // Create the player in the middle of the game
      this.player = this.game.add.sprite(70, 100, 'player');

      // Add gravity to make it fall
      this.player.body.gravity.y = 600;

      // Create 3 groups that will contain our objects
      this.walls = this.game.add.group();
      this.coins = this.game.add.group();
      this.enemies = this.game.add.group();

      // Design the level. x = wall, o = coin, ! = lava.
      var level = ['xxxxxxxxxxxxxxxxxxxxxx', '!         !          x', '!                 o  x', '!         o          x', '!                    x', '!     o   !    x     x', 'xxxxxxxxxxxxxxxx!!!!!x'];
      // Create the level by going through the array
      for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {

          // Create a wall and add it to the 'walls' group
          if (level[i][j] == 'x') {
            var wall = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true;
          }

          // Create a coin and add it to the 'coins' group
          else if (level[i][j] == 'o') {
              var coin = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
              this.coins.add(coin);
            }

            // Create a enemy and add it to the 'enemies' group
            else if (level[i][j] == '!') {
                var enemy = this.game.add.sprite(30 + 20 * j, 30 + 20 * i, 'lava');
                this.enemies.add(enemy);
              }
        }
      }
      this.jump = false;
      this.left = this.right = false;
      if (this.isMobileAndTablet) {
        var fnJumpUp = function fnJumpUp() {
          _this2.jump = false;
        };
        var fnJumpDown = function fnJumpDown() {
          if (_this2.player.body.touching.down) _this2.jump = true;
        };
        this.buttonjump = this.game.add.button(400, 175, 'up', null, this, 0, 1, 0, 1);
        this.buttonjump.fixedToCamera = true;
        this.buttonjump.events.onInputOver.add(fnJumpDown);
        this.buttonjump.events.onInputOut.add(fnJumpUp);
        this.buttonjump.events.onInputDown.add(fnJumpDown);
        this.buttonjump.events.onInputUp.add(fnJumpUp);

        var fnLeftUp = function fnLeftUp() {
          _this2.left = false;
        };
        var fnLeftDown = function fnLeftDown() {
          _this2.left = true;
        };
        this.buttonleft = this.game.add.button(50, 175, 'left', null, this, 0, 1, 0, 1);
        this.buttonleft.fixedToCamera = true;
        this.buttonleft.events.onInputOver.add(fnLeftDown);
        this.buttonleft.events.onInputOut.add(fnLeftUp);
        this.buttonleft.events.onInputDown.add(fnLeftDown);
        this.buttonleft.events.onInputUp.add(fnLeftUp);

        var fnRightUp = function fnRightUp() {
          _this2.right = false;
        };
        var fnRightDown = function fnRightDown() {
          _this2.right = true;
        };
        this.buttonright = this.game.add.button(100, 175, 'right', null, this, 0, 1, 0, 1);
        this.buttonright.fixedToCamera = true;
        this.buttonright.events.onInputOver.add(fnRightDown);
        this.buttonright.events.onInputOut.add(fnRightUp);
        this.buttonright.events.onInputDown.add(fnRightDown);
        this.buttonright.events.onInputUp.add(fnRightUp);
      }
    }
  }, {
    key: "move",
    value: function move() {
      if (this.right) {
        this.player.body.velocity.x = 200;
      } else if (this.left) {
        this.player.body.velocity.x = -200;
      } else {
        this.player.body.velocity.x = 0;
      }
      // Make the player jump if he is touching the ground
      if (this.jump) {
        this.player.body.velocity.y = -250;
        this.jump = false;
      }
    }
  }, {
    key: "update",
    value: function update() {
      // Make the player and the walls collide
      this.game.physics.arcade.collide(this.player, this.walls);

      // Call the 'takeCoin' function when the player takes a coin
      this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

      // Call the 'restart' function when the player touches the enemy
      this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
      this.move();
      if (!this.isMobileAndTablet) {
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown) {
          this.left = true;
        }
        if (this.cursor.right.isDown) {
          this.right = true;
        }
        if (this.cursor.left.isUp) {
          this.left = false;
        }
        if (this.cursor.right.isUp) {
          this.right = false;
        }
        // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
          this.jump = true;
        } else if (this.cursor.up.isUp) {
          this.jump = false;
        }
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      this.game.load.image('player', ASSETS_FOLDER + 'player.png');
      this.game.load.image('wall', ASSETS_FOLDER + 'wall.png');
      this.game.load.image('coin', ASSETS_FOLDER + 'coin.png');
      this.game.load.image('lava', ASSETS_FOLDER + 'lava.png');

      this.game.load.image('left', ASSETS_FOLDER + 'left.png');
      this.game.load.image('right', ASSETS_FOLDER + 'right.png');
      this.game.load.image('up', ASSETS_FOLDER + 'up.png');

      this.isMobileAndTablet = (0, _Constants.isMobileAndTablet)();
    }
  }, {
    key: "takeCoin",
    value: function takeCoin(player, coin) {
      coin.kill();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.game.state.start('Game');
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.spriteInfo(this.player, 32, 32);
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"./Constants.js":2}]},{},[1])
//# sourceMappingURL=platformer.js.map
