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

var MapGenerator = function (_Phaser$Game) {
  _inherits(MapGenerator, _Phaser$Game);

  function MapGenerator() {
    _classCallCheck(this, MapGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapGenerator).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = true;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return MapGenerator;
}(Phaser.Game);

new MapGenerator();

},{"states/GameState":10}],2:[function(require,module,exports){
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

var Character = function (_Phaser$Sprite) {
    _inherits(Character, _Phaser$Sprite);

    function Character(game, x, y, key, frame) {
        _classCallCheck(this, Character);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Character).call(this, game, x, y, key, frame));

        game.physics.arcade.enable(_this);
        _this.scale.setTo(0.25, 0.25);
        //this.scale.setTo(0.5, 0.5);
        _this.cursors = game.input.keyboard.createCursorKeys();
        //this.body.gravity.y = 600;
        return _this;
    }

    _createClass(Character, [{
        key: "update",
        value: function update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.cursors.left.isDown) {
                this.body.velocity.x = -200;
            } else if (this.cursors.right.isDown) {
                this.body.velocity.x = 200;
            }

            if (this.cursors.up.isDown) {
                this.body.velocity.y = -200;
            } else if (this.cursors.down.isDown) {
                this.body.velocity.y = 200;
            }
        }
    }]);

    return Character;
}(Phaser.Sprite);

exports.default = Character;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Color = exports.Color = "#473B3B";
var WallSize = exports.WallSize = 16;

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

var _corridorSprite = require('./corridorSprite');

var _corridorSprite2 = _interopRequireDefault(_corridorSprite);

var _constants = require('./constants');

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

var Directions = ["vertical", "horizontal"];

var Corridor = function (_Phaser$Group) {
  _inherits(Corridor, _Phaser$Group);

  function Corridor(game, parent, x, y, width, height, direction) {
    _classCallCheck(this, Corridor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Corridor).call(this, game, parent, "corridor", true, true, Phaser.Physics.ARCADE));

    if (!Directions.includes(direction)) {
      console.error('Corridor:constructor : ' + direction + ' is a not a value possible [' + Directions + ']');
    }
    _this.addWalls(game, x, y, width, height, direction);
    return _this;
  }

  _createClass(Corridor, [{
    key: 'addWalls',
    value: function addWalls(game, x, y, width, height, direction) {
      if (direction === "vertical") {
        this.addVerticalWall(game, x, y, width, height);
      } else {
        this.addHorizontalWall(game, x, y, width, height);
      }
    }
  }, {
    key: 'addVerticalWall',
    value: function addVerticalWall(game, x, y, width, height) {
      var corridorSprite = new _corridorSprite2.default(game, x, y, width, height);
      for (var i = y; i < y + height; i += _constants.WallSize) {
        var leftWall = this.addWall(game, x - _constants.WallSize, i);
        var rightWall = this.addWall(game, x + width, i);
        this.add(leftWall);
        this.add(rightWall);
      }
      for (var j = x - _constants.WallSize; j < x + width + _constants.WallSize; j += _constants.WallSize) {
        var topWall = this.addWall(game, j, y - _constants.WallSize);
        var bottomWall = this.addWall(game, j, y + height);
        this.add(topWall);
        this.add(bottomWall);
      }
      this.add(corridorSprite);
    }
  }, {
    key: 'addHorizontalWall',
    value: function addHorizontalWall(game, x, y, width, height) {
      var corridorSprite = new _corridorSprite2.default(game, x, y, width, height);
      for (var i = x; i < x + width; i += _constants.WallSize) {
        var upWall = this.addWall(game, i, y - _constants.WallSize);
        var bottomWall = this.addWall(game, i, y + height);
        this.add(upWall);
        this.add(bottomWall);
      }
      for (var j = y - _constants.WallSize; j < y + height + _constants.WallSize; j += _constants.WallSize) {
        var leftWall = this.addWall(game, x - _constants.WallSize, j);
        var rightWall = this.addWall(game, x + width, j);
        this.add(leftWall);
        this.add(rightWall);
      }
      this.add(corridorSprite);
    }
  }, {
    key: 'addWall',
    value: function addWall(game, x, y) {
      var wall = game.add.sprite(x, y, 'Wall');
      wall.name = "colissionWall";
      //wall.alpha = 0.2;
      game.physics.enable(wall, Phaser.Physics.ARCADE);
      wall.body.immovable = true;
      return wall;
    }
  }, {
    key: 'corridorSprite',
    value: function corridorSprite() {
      var corridorSprite = this.children.find(function (child) {
        return child.name === "corridorSprite";
      });
      if (!corridorSprite) {
        //to avoid undefined attribute
        return { x: -1, y: -1, width: -1, height: -1 };
      }
      return corridorSprite;
    }
  }, {
    key: 'walls',
    value: function walls() {
      return this.children.filter(function (child) {
        return child.name == "colissionWall";
      });
    }
  }]);

  return Corridor;
}(Phaser.Group);

exports.default = Corridor;

},{"./constants":3,"./corridorSprite":5}],5:[function(require,module,exports){
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

var _constants = require("./constants.js");

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

var CorridorSprite = function (_Phaser$Sprite) {
  _inherits(CorridorSprite, _Phaser$Sprite);

  function CorridorSprite(game, x, y, width, height) {
    var color = arguments.length <= 5 || arguments[5] === undefined ? _constants.Color : arguments[5];

    _classCallCheck(this, CorridorSprite);

    var bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = _constants.Color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CorridorSprite).call(this, game, x, y, bmd));

    _this.center = { x: x + width / 2, y: y + height / 2 };
    _this.name = "corridorSprite";
    return _this;
  }

  _createClass(CorridorSprite, [{
    key: "overlapRoom",
    value: function overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
    }
  }]);

  return CorridorSprite;
}(Phaser.Sprite);

exports.default = CorridorSprite;

},{"./constants.js":3}],6:[function(require,module,exports){
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

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _corridor = require('./corridor');

var _corridor2 = _interopRequireDefault(_corridor);

var _utils = require('./utils');

var _constants = require('./constants');

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

var CorridorHeight = 4 * _constants.WallSize;
var CorridorWidth = 4 * _constants.WallSize;
var MaxRoom = 10;
var MinRoomSize = 5 * _constants.WallSize;
var MaxRoomSize = 5 * _constants.WallSize;

var MapWidth = 1000;
var MapHeight = 1000;

var Dungeon = function (_Phaser$Group) {
  _inherits(Dungeon, _Phaser$Group);

  function Dungeon(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, Dungeon);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dungeon).call(this, game, parent, name, false, true, Phaser.Physics.ARCADE));

    var _loop = function _loop(i) {
      //FIX ME  the computation does not work well
      var width = (0, _utils.modGrid)(_constants.WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      var height = (0, _utils.modGrid)(_constants.WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      var x = (0, _utils.modGrid)(_constants.WallSize, Math.random() * (MapWidth - width - 1) + 1);
      var y = (0, _utils.modGrid)(_constants.WallSize, Math.random() * (MapHeight - height - 1) + 1);

      var newRoom = new _room2.default(game, game.world, x, y, width, height);
      var failed = false;
      _this.children.some(function (child) {
        failed = newRoom.overlapRoom(child);
        if (failed) {
          //exit le loop
          return true;
        }
      });
      if (!failed) {
        // local function to carve out new room
        _this.createRoom(newRoom);
        if (_this.rooms().length > 1) {
          var prevRoom = _this.findLastRoom(newRoom);
          var rng = Math.random() * 2;
          if (rng >= 1) {
            _this.horizontalCorridor(game, prevRoom, newRoom);
            _this.verticalCorridor(game, prevRoom, newRoom, false);
          } else {
            _this.verticalCorridor(game, prevRoom, newRoom);
            _this.horizontalCorridor(game, prevRoom, newRoom, false);
          }
        }
      }
    };

    for (var i = 0; i < MaxRoom; i++) {
      _loop(i);
    }
    _this.removeUselessWalls(game);
    return _this;
  }

  _createClass(Dungeon, [{
    key: 'rooms',
    value: function rooms() {
      var newRoom = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.children.filter(function (child) {
        return child.name === "room" && child != newRoom;
      });
    }
  }, {
    key: 'findLastRoom',
    value: function findLastRoom(newRoom) {
      var rooms = this.rooms(newRoom);
      return rooms[rooms.length - 1];
    }
  }, {
    key: 'createRoom',
    value: function createRoom(room) {
      this.add(room);
    }
  }, {
    key: 'horizontalCorridor',
    value: function horizontalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var x1 = Math.min(prevRoom.borders().center.x, newRoom.borders().center.x);
      var x2 = Math.max(prevRoom.borders().center.x, newRoom.borders().center.x);
      var y = first ? prevRoom.borders().center.y : newRoom.borders().center.y;
      var width = x2 - x1;
      var corridor = new _corridor2.default(game, game.world, x1, y - CorridorHeight / 2, width, CorridorHeight, "horizontal");
      this.add(corridor);
    }
  }, {
    key: 'verticalCorridor',
    value: function verticalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var y1 = Math.min(prevRoom.borders().center.y, newRoom.borders().center.y);
      var y2 = Math.max(prevRoom.borders().center.y, newRoom.borders().center.y);
      var x = first ? prevRoom.borders().center.x : newRoom.borders().center.x;
      var height = y2 - y1;
      var corridor = new _corridor2.default(game, game.world, x - CorridorWidth / 2, y1, CorridorWidth, height, "vertical");
      this.add(corridor);
    }
  }, {
    key: 'getInitialRoom',
    value: function getInitialRoom() {
      return this.rooms()[0];
    }
  }, {
    key: 'collide',
    value: function collide(character) {
      var collide = false;
      this.children.forEach(function (child) {
        if (child.name === "corridor") {
          if ((0, _utils.isInside)(character, child.corridorSprite())) {
            collide = true;
          }
        } else {
          if ((0, _utils.isInside)(character, child)) {
            collide = true;
          }
        }
      });
      return collide;
    }
  }, {
    key: 'walls',
    value: function walls() {
      var arrayMultipleDim = this.children.map(function (child) {
        return child.walls();
      });
      return [].concat.apply([], arrayMultipleDim);
    }
  }, {
    key: 'corridors',
    value: function corridors() {
      return this.children.filter(function (child) {
        return child.name === "corridor";
      });
    }
  }, {
    key: 'corridorSprites',
    value: function corridorSprites() {
      return this.corridors().map(function (child) {
        return child.corridorSprite();
      });
    }
  }, {
    key: 'roomsSprites',
    value: function roomsSprites() {
      return this.rooms().map(function (child) {
        return child.roomSprite();
      });
    }
  }, {
    key: 'removeUselessWalls',
    value: function removeUselessWalls(game) {
      var _this2 = this;

      var destroyFunction = function destroyFunction(wall, other) {
        wall.kill();
      };

      this.rooms().forEach(function (room) {
        game.physics.arcade.collide(room.walls(), _this2.corridorSprites(), destroyFunction);
      });

      this.corridors().forEach(function (corridor) {
        game.physics.arcade.collide(corridor.walls(), _this2.roomsSprites(), destroyFunction);
      });

      this.corridors().forEach(function (corridor) {
        _this2.corridors().forEach(function (corridor2) {
          if (corridor !== corridor2) {
            game.physics.arcade.collide(corridor.walls(), corridor2.corridorSprite(), destroyFunction);
          }
        });
      });
    }
  }]);

  return Dungeon;
}(Phaser.Group);

exports.default = Dungeon;

},{"./constants":3,"./corridor":4,"./room":7,"./utils":9}],7:[function(require,module,exports){
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

var _constants = require('./constants');

var _roomSprite = require('./roomSprite');

var _roomSprite2 = _interopRequireDefault(_roomSprite);

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

var Room = function (_Phaser$Group) {
  _inherits(Room, _Phaser$Group);

  function Room(game, parent, x, y, width, height) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Room).call(this, game, parent, "room", true, true, Phaser.Physics.ARCADE));

    _this.createRoom(game, x, y, width, height);
    return _this;
  }

  _createClass(Room, [{
    key: 'createRoom',
    value: function createRoom(game, x, y, width, height) {
      var room = new _roomSprite2.default(game, x, y, width, height);
      this.add(room);
      for (var i = x; i < x + width + _constants.WallSize; i += _constants.WallSize) {
        var upWall = this.addWall(game, i, y - _constants.WallSize);
        var downWall = this.addWall(game, i, y + height);
        this.add(upWall);
        this.add(downWall);
      }
      for (var j = y; j < y + height; j += _constants.WallSize) {
        var leftWall = this.addWall(game, x - _constants.WallSize, j);
        var rightWall = this.addWall(game, x + width, j);
        this.add(leftWall);
        this.add(rightWall);
      }
    }
  }, {
    key: 'addWall',
    value: function addWall(game, x, y) {
      var wall = game.add.sprite(x, y, 'Wall');
      wall.name = "RoomWall";
      //wall.alpha = 0.2;
      game.physics.enable(wall, Phaser.Physics.ARCADE);
      wall.body.immovable = true;
      return wall;
    }
  }, {
    key: 'borders',
    value: function borders() {
      return this.roomSprite();
    }
  }, {
    key: 'walls',
    value: function walls() {
      return this.children.filter(function (child) {
        return child.name === "RoomWall";
      });
    }
  }, {
    key: 'roomSprite',
    value: function roomSprite() {
      return this.children.find(function (child) {
        return child.name === "RoomSprite";
      });
    }
  }, {
    key: 'overlapRoom',
    value: function overlapRoom(room) {
      this.roomSprite().overlapRoom(room);
    }
  }]);

  return Room;
}(Phaser.Group);

exports.default = Room;

},{"./constants":3,"./roomSprite":8}],8:[function(require,module,exports){
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

var _constants = require("./constants.js");

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

var RoomSprite = function (_Phaser$Sprite) {
  _inherits(RoomSprite, _Phaser$Sprite);

  function RoomSprite(game, x, y, width, height) {
    var color = arguments.length <= 5 || arguments[5] === undefined ? _constants.Color : arguments[5];

    _classCallCheck(this, RoomSprite);

    var bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoomSprite).call(this, game, x, y, bmd));

    _this.center = { x: x + width / 2, y: y + height / 2 };
    _this.name = "RoomSprite";
    return _this;
  }

  _createClass(RoomSprite, [{
    key: "overlapRoom",
    value: function overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
    }
  }]);

  return RoomSprite;
}(Phaser.Sprite);

exports.default = RoomSprite;

},{"./constants.js":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInside = isInside;
exports.overlap = overlap;
exports.overlapWithDifference = overlapWithDifference;
exports.modGrid = modGrid;
function isInside(compared, comparator) {
  var rectCompared = { x: compared.x, y: compared.y, x2: compared.x + compared.width, y2: compared.y + compared.height };
  var rectComparator = { x: comparator.x, y: comparator.y, x2: comparator.x + comparator.width, y2: comparator.y + comparator.height };

  return rectCompared.x > rectComparator.x && rectCompared.y > rectComparator.y && rectCompared.x2 < rectComparator.x2 && rectCompared.y2 < rectComparator.y2;
}

function overlap(box1, box2) {
  if (box1.x + box1.width < box2.x) return false; // a is left of b
  if (box1.x > box2.x + box2.width) return false; // a is right of b
  if (box1.y + box1.height < box2.y) return false; // a is above b
  if (box1.y > box2.y + box2.height) return false; // a is below b
  return true; // boxes overlap
}

function overlapWithDifference(box1, box2) {
  var output = {};
  output.x = Math.max(box1.x, box2.x);
  output.y = Math.max(box1.y, box2.y);
  output.width = Math.min(box1.right, box2.right) - output.x;
  output.height = Math.min(box1.bottom, box2.bottom) - output.y;
  return [overlap(box1, box2), output];
}

function modGrid(modValue, value) {
  var offset = value % modValue;
  return value + (modValue - offset);
}

},{}],10:[function(require,module,exports){
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

var _character = require('object/character');

var _character2 = _interopRequireDefault(_character);

var _dungeon = require('object/dungeon');

var _dungeon2 = _interopRequireDefault(_dungeon);

var _utils = require('object/utils');

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

var PATH = "res/map-generator";

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = "#4488AA";
      this.game.world.setBounds(0, 0, 3000, 1000);
      this.character = new _character2.default(this.game, 50, 200, 'Character', 0);
      this.dungeon = new _dungeon2.default(this.game);
      var roomPosition = this.dungeon.getInitialRoom().borders().center;
      this.character.position.setTo(roomPosition.x, roomPosition.y);
      this.game.add.existing(this.character);
      this.game.camera.follow(this.character);
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.collide(this.character, this.dungeon.walls());
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('Character', PATH + '/character.png');
      this.game.load.image('Wall', PATH + '/wall.png');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"object/character":2,"object/dungeon":6,"object/utils":9}]},{},[1])
//# sourceMappingURL=map-generator.js.map
