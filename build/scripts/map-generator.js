(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldHeight = exports.WorldWitdth = exports.CornerHeight = exports.CornerWidth = exports.CarpetHeight = exports.CarpetWidth = exports.WallSize = undefined;

var _constants = require("../lib/constants");

var WallSize = exports.WallSize = _constants.WallSize;
var CarpetWidth = exports.CarpetWidth = 40;
var CarpetHeight = exports.CarpetHeight = 40;
var CornerWidth = exports.CornerWidth = 20;
var CornerHeight = exports.CornerHeight = 20;

var WorldWitdth = exports.WorldWitdth = 2000;
var WorldHeight = exports.WorldHeight = 2000;

},{"../lib/constants":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Character = exports.Character = "Character";
var Corner = exports.Corner = "Corner";
var Carpet = exports.Carpet = "Carpet";

},{}],3:[function(require,module,exports){
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

var MapGenerator = function (_Phaser$Game) {
  _inherits(MapGenerator, _Phaser$Game);

  function MapGenerator() {
    _classCallCheck(this, MapGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapGenerator).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.mazeCreated = new Phaser.Signal();
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  _createClass(MapGenerator, [{
    key: 'listen',
    value: function listen(Fn) {
      this.mazeCreated.add(Fn, this);
    }
  }, {
    key: 'importFromJson',
    value: function importFromJson(JSONData) {
      this.reload({ JSONData: JSONData });
    }
  }, {
    key: 'currentState',
    value: function currentState() {
      var currentStateName = this.state.current;
      return this.state.states[currentStateName];
    }
  }, {
    key: 'getJSONData',
    value: function getJSONData() {
      return this.currentState().maze.exportJSON();
    }
  }, {
    key: 'reload',
    value: function reload(params) {
      this.state.start('GameState', true, false, params);
    }
  }]);

  return MapGenerator;
}(Phaser.Game);

window.game = new MapGenerator();

},{"states/GameState":16}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("./constants");

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

var Block = function (_Phaser$Sprite) {
  _inherits(Block, _Phaser$Sprite);

  function Block(game, x, y) {
    var name = arguments.length <= 3 || arguments[3] === undefined ? "Block" : arguments[3];
    var color = arguments.length <= 4 || arguments[4] === undefined ? _constants.Color : arguments[4];
    var width = arguments.length <= 5 || arguments[5] === undefined ? _constants.WallSize : arguments[5];
    var height = arguments.length <= 6 || arguments[6] === undefined ? _constants.WallSize : arguments[6];

    _classCallCheck(this, Block);

    var bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Block).call(this, game, x, y, bmd));

    _this.name = name;
    game.physics.arcade.enable(_this);
    _this.body.immovable = true;
    return _this;
  }

  return Block;
}(Phaser.Sprite);

exports.default = Block;

},{"./constants":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Color = exports.Color = "#473B3B";
var WallColor = exports.WallColor = "#395992";
var WallSize = exports.WallSize = 16;

var Vertical = exports.Vertical = "vertical";
var Horizontal = exports.Horizontal = "horizontal";
var Directions = exports.Directions = [Vertical, Horizontal];

var RoomName = exports.RoomName = "room";
var CorridorName = exports.CorridorName = "corridor";
var InvisibleWallName = exports.InvisibleWallName = "invisibleWall";

},{}],6:[function(require,module,exports){
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

var _wall = require('./wall');

var _wall2 = _interopRequireDefault(_wall);

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

var WallName = "ColissionWall";
var SpriteName = "CorridorSprite";

var Corridor = function (_Phaser$Group) {
  _inherits(Corridor, _Phaser$Group);

  function Corridor(game, parent, x, y, width, height, direction) {
    _classCallCheck(this, Corridor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Corridor).call(this, game, parent, _constants.CorridorName, true, true, Phaser.Physics.ARCADE));

    if (!_constants.Directions.includes(direction)) {
      console.error('Corridor:constructor : ' + direction + ' is a not a value possible [' + _constants.Directions + ']');
    }
    _this.direction = direction;
    //width and height less the walls size
    _this.originalWidth = width;
    _this.originalHeight = height;
    _this.addWalls(game, x, y, width, height);
    return _this;
  }

  _createClass(Corridor, [{
    key: 'addWalls',
    value: function addWalls(game, x, y, width, height) {
      if (this.direction === _constants.Vertical) {
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
      var wall = new _wall2.default(game, x, y, WallName);
      //wall.alpha = 0.8
      return wall;
    }
  }, {
    key: 'corridorSprite',
    value: function corridorSprite() {
      var corridorSprite = this.children.find(function (child) {
        return child.name === SpriteName;
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
        return child.name === WallName;
      });
    }
  }]);

  return Corridor;
}(Phaser.Group);

exports.default = Corridor;

},{"./constants":5,"./corridorSprite":7,"./wall":12}],7:[function(require,module,exports){
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
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CorridorSprite).call(this, game, x, y, bmd));

    _this.center = { x: x + width / 2, y: y + height / 2 };
    //add constant
    _this.name = "CorridorSprite";
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

},{"./constants.js":5}],8:[function(require,module,exports){
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

var _corridor = require("./corridor");

var _corridor2 = _interopRequireDefault(_corridor);

var _block = require("./block");

var _block2 = _interopRequireDefault(_block);

var _utils = require("./utils");

var _constants = require("./constants");

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
//each room shoud have the same size
var MinRoomSize = 4;
var MaxRoomSize = 8;

var Maze = function (_Phaser$Group) {
  _inherits(Maze, _Phaser$Group);

  function Maze(game, parent, worldWitdth, worldHeight, nbRooms, arrayOfRoom) {
    _classCallCheck(this, Maze);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Maze).call(this, game, parent, "maze", false, true, Phaser.Physics.ARCADE));

    _this.worldWitdth = worldWitdth;
    _this.worldHeight = worldHeight;
    _this.arrayOfRoom = arrayOfRoom;
    _this.nbRooms = nbRooms || MaxRoom;
    console.info(_this.nbRooms);
    return _this;
  }

  _createClass(Maze, [{
    key: "rooms",
    value: function rooms() {
      var newRoom = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.children.filter(function (child) {
        return child.name === _constants.RoomName && child != newRoom;
      });
    }
  }, {
    key: "findLastRoom",
    value: function findLastRoom(newRoom) {
      var rooms = this.rooms(newRoom);
      return rooms[rooms.length - 1];
    }
  }, {
    key: "createRoom",
    value: function createRoom(room) {
      this.add(room);
    }
  }, {
    key: "horizontalCorridor",
    value: function horizontalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var x1 = Math.min(prevRoom.borders().center.x, newRoom.borders().center.x);
      var x2 = Math.max(prevRoom.borders().center.x, newRoom.borders().center.x);
      var y = first ? prevRoom.borders().center.y : newRoom.borders().center.y;
      var width = x2 - x1;
      var corridor = new _corridor2.default(game, game.world, x1, y - CorridorHeight / 2, width, CorridorHeight, _constants.Horizontal);
      this.add(corridor);
    }
  }, {
    key: "verticalCorridor",
    value: function verticalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var y1 = Math.min(prevRoom.borders().center.y, newRoom.borders().center.y);
      var y2 = Math.max(prevRoom.borders().center.y, newRoom.borders().center.y);
      var x = first ? prevRoom.borders().center.x : newRoom.borders().center.x;
      var height = y2 - y1;
      var corridor = new _corridor2.default(game, game.world, x - CorridorWidth / 2, y1, CorridorWidth, height, _constants.Vertical);
      this.add(corridor);
    }
  }, {
    key: "getInitialRoom",
    value: function getInitialRoom() {
      return this.rooms()[0];
    }
  }, {
    key: "collide",
    value: function collide(character) {
      var collide = false;
      this.children.forEach(function (child) {
        if (child.name === _constants.CorridorName) {
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
    key: "walls",
    value: function walls() {
      var arrayMultipleDim = this.children.map(function (child) {
        //wall class does not have walls method
        if (typeof child.walls === "function") {
          return child.walls();
        }
      }).filter(Boolean);
      return [].concat.apply([], arrayMultipleDim);
    }
  }, {
    key: "corridors",
    value: function corridors() {
      return this.children.filter(function (child) {
        return child.name === _constants.CorridorName;
      });
    }
  }, {
    key: "corridorSprites",
    value: function corridorSprites() {
      return this.corridors().map(function (child) {
        return child.corridorSprite();
      });
    }
  }, {
    key: "roomsSprites",
    value: function roomsSprites() {
      return this.rooms().map(function (child) {
        return child.roomSprite();
      });
    }
  }, {
    key: "removeUselessWalls",
    value: function removeUselessWalls(game) {
      var _this2 = this;

      var destroyFunction = function destroyFunction(wall, other) {
        wall.kill();
      };

      var destroyWallAndAddMissingTile = function destroyWallAndAddMissingTile(wall, other) {
        if (!(0, _utils.isInside)(wall, other)) {
          var missing = new _block2.default(game, wall.x, wall.y, _constants.InvisibleWallName);
          _this2.add(missing);
        }
        wall.kill();
      };

      this.corridors().forEach(function (corridor) {
        _this2.corridors().forEach(function (corridor2) {
          if (corridor !== corridor2) {
            game.physics.arcade.collide(corridor.walls(), corridor2.corridorSprite(), destroyWallAndAddMissingTile);
          }
        });
      });
      this.corridors().forEach(function (corridor) {
        game.physics.arcade.collide(corridor.walls(), _this2.roomsSprites(), destroyFunction);
      });
      this.rooms().forEach(function (room) {
        game.physics.arcade.collide(room.walls(), _this2.corridorSprites(), destroyWallAndAddMissingTile);
      });
    }
  }, {
    key: "addAdditionalSprite",
    value: function addAdditionalSprite(game) {
      this.rooms().forEach(function (room) {
        room.addAdditionalSprite(game);
      });
    }
  }, {
    key: "sortDepth",
    value: function sortDepth() {
      var compare = function compare(a, b) {
        if (a.name === b.name) {
          return 0;
        } else if (a.name === _constants.InvisibleWallName) {
          return -1;
        } else if (a.name === _constants.RoomName && b.name === _constants.CorridorName) {
          return 1;
        } else if (a.name === _constants.CorridorName && b.name === _constants.RoomName) {
          return -1;
        }
        //other cases
        return 1;
      };
      this.children.sort(compare);
    }
  }, {
    key: "exportJSON",
    value: function exportJSON() {
      var roomArray = this.rooms().map(function (m) {
        return { x: m.roomSprite().x, y: m.roomSprite().y, w: m.originalWidth, h: m.originalHeight, klassName: m.constructor.name };
      });
      var corridorArray = this.corridors().map(function (m) {
        return { x: m.corridorSprite().x, y: m.corridorSprite().y, w: m.originalWidth, h: m.originalHeight, direction: m.direction };
      });
      return JSON.stringify({ rooms: roomArray, corridors: corridorArray });
    }
  }, {
    key: "generate",
    value: function generate(game) {
      var JSONData = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var strategyFn = JSONData === null ? this.randomGeneration.bind(this) : this.importFromJson(JSONData).bind(this);
      this.generateLevel(game, strategyFn);
    }
  }, {
    key: "generateLevel",
    value: function generateLevel(game, generationFunction) {
      generationFunction(game);
      this.removeUselessWalls(game);
      this.sortDepth();
      this.addAdditionalSprite(game);
    }
  }, {
    key: "randomGeneration",
    value: function randomGeneration(game) {
      var _this3 = this;

      var _loop = function _loop(i) {
        //FIX ME  the computation does not work well
        // TODO OFFSET WALLSIZE
        var width = Math.trunc(MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize)) * _constants.WallSize;
        var height = Math.trunc(MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize)) * _constants.WallSize;
        //console.log(width, height)

        var x = (0, _utils.modGrid)(_constants.WallSize, Math.random() * (_this3.worldWitdth - width - 1) + 1);
        var y = (0, _utils.modGrid)(_constants.WallSize, Math.random() * (_this3.worldHeight - height - 1) + 1);

        var indexChosen = Math.trunc(Math.random() * _this3.arrayOfRoom.length);
        var newRoom = Reflect.construct(_this3.arrayOfRoom[indexChosen], [game, game.world, x, y, width, height]);
        var failed = false;
        _this3.children.some(function (child) {
          failed = newRoom.overlapRoom(child);
          if (failed) {
            //exit le loop
            return true;
          }
        });
        if (!failed) {
          // local function to carve out new room
          _this3.createRoom(newRoom);
          if (_this3.rooms().length > 1) {
            var prevRoom = _this3.findLastRoom(newRoom);
            var rng = Math.random() * 2;
            if (rng >= 1) {
              _this3.horizontalCorridor(game, prevRoom, newRoom);
              _this3.verticalCorridor(game, prevRoom, newRoom, false);
            } else {
              _this3.verticalCorridor(game, prevRoom, newRoom);
              _this3.horizontalCorridor(game, prevRoom, newRoom, false);
            }
          }
        }
      };

      for (var i = 0; i < this.nbRooms; i++) {
        _loop(i);
      }
    }
  }, {
    key: "importFromJson",
    value: function importFromJson(JSONData) {
      var _this4 = this;

      return function (game) {
        var data = JSON.parse(JSONData);
        _this4.import(game, data.rooms, data.corridors);
      };
    }
  }, {
    key: "import",
    value: function _import(game, rooms, corridors) {
      var _this5 = this;

      var findTypeOfRoom = function findTypeOfRoom(arrayOfRoom, roomName) {
        var roomSelected = arrayOfRoom.find(function (room) {
          return room.name === roomName;
        });
        if (!roomSelected) {
          console.error("\"" + roomName + "\" is unknonwn amoung theses classes: [" + arrayOfRoom.map(function (t) {
            return t.name;
          }) + " ]");
          return arrayOfRoom[0];
        }
        return roomSelected;
      };

      rooms.forEach(function (room) {
        var newRoom = Reflect.construct(findTypeOfRoom(_this5.arrayOfRoom, room.klassName), [game, game.world, room.x, room.y, room.w, room.h]);
        _this5.createRoom(newRoom);
      });
      corridors.forEach(function (corridor) {
        var newCorridor = new _corridor2.default(game, game.world, corridor.x, corridor.y, corridor.w, corridor.h, corridor.direction);
        _this5.add(newCorridor);
      });
    }
  }]);

  return Maze;
}(Phaser.Group);

exports.default = Maze;

},{"./block":4,"./constants":5,"./corridor":6,"./utils":11}],9:[function(require,module,exports){
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

var _wall = require('./wall');

var _wall2 = _interopRequireDefault(_wall);

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

var WallName = "RoomWall";
var SpriteName = "RoomSprite";

var Room = function (_Phaser$Group) {
  _inherits(Room, _Phaser$Group);

  function Room(game, parent, x, y, width, height) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Room).call(this, game, parent, _constants.RoomName, true, true, Phaser.Physics.ARCADE));

    _this.createRoom(game, x, y, width, height);
    _this.originalX = x;
    _this.originalY = y;
    //width and height less the walls size
    _this.originalWidth = width;
    _this.originalHeight = height;
    return _this;
  }

  _createClass(Room, [{
    key: 'createRoom',
    value: function createRoom(game, x, y, width, height) {
      var room = new _roomSprite2.default(game, x, y, width, height);
      this.add(room);
      for (var i = x - _constants.WallSize; i < x + width + _constants.WallSize; i += _constants.WallSize) {
        this.addWall(game, i, y - _constants.WallSize);
        this.addWall(game, i, y + height);
      }
      for (var j = y; j < y + height; j += _constants.WallSize) {
        this.addWall(game, x - _constants.WallSize, j);
        this.addWall(game, x + width, j);
      }
    }
  }, {
    key: 'addWall',
    value: function addWall(game, x, y) {
      var wall = new _wall2.default(game, x, y, WallName);
      //wall.alpha = 0.1;
      this.add(wall);
    }
  }, {
    key: 'addAdditionalSprite',
    value: function addAdditionalSprite(game) {
      // NOTHING TO DO HERE
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
        return child.name === WallName;
      });
    }
  }, {
    key: 'roomSprite',
    value: function roomSprite() {
      return this.children.find(function (child) {
        return child.name === SpriteName;
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

},{"./constants":5,"./roomSprite":10,"./wall":12}],10:[function(require,module,exports){
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
    // add constant
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

},{"./constants.js":5}],11:[function(require,module,exports){
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

  return rectCompared.x >= rectComparator.x && rectCompared.y >= rectComparator.y && rectCompared.x2 <= rectComparator.x2 && rectCompared.y2 <= rectComparator.y2;
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

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("./constants");

var _block = require("./block");

var _block2 = _interopRequireDefault(_block);

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

var Wall = function (_Block) {
  _inherits(Wall, _Block);

  function Wall(game, x, y, key) {
    _classCallCheck(this, Wall);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Wall).call(this, game, x, y, key, _constants.WallColor, _constants.WallSize, _constants.WallSize));
  }

  return Wall;
}(_block2.default);

exports.default = Wall;

},{"./block":4,"./constants":5}],13:[function(require,module,exports){
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

var Velocity = 400;

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
                this.body.velocity.x = -Velocity;
            } else if (this.cursors.right.isDown) {
                this.body.velocity.x = Velocity;
            }

            if (this.cursors.up.isDown) {
                this.body.velocity.y = -Velocity;
            } else if (this.cursors.down.isDown) {
                this.body.velocity.y = Velocity;
            }
        }
    }]);

    return Character;
}(Phaser.Sprite);

exports.default = Character;

},{}],14:[function(require,module,exports){
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

var _room = require("../lib/room");

var _room2 = _interopRequireDefault(_room);

var _constants = require("../constants/constants");

var _keyUtils = require("../constants/keyUtils");

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

var RoomWithCarpet = function (_Room) {
  _inherits(RoomWithCarpet, _Room);

  function RoomWithCarpet() {
    _classCallCheck(this, RoomWithCarpet);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RoomWithCarpet).apply(this, arguments));
  }

  _createClass(RoomWithCarpet, [{
    key: "addAdditionalSprite",
    value: function addAdditionalSprite(game) {
      var heightRoom = this.height - 2 * _constants.WallSize;
      var widthRoom = this.width - 2 * _constants.WallSize;
      var x = this.originalX + widthRoom / 2 - _constants.CarpetWidth / 2;
      var y = this.originalY + heightRoom / 2 - _constants.CarpetHeight / 2;

      var carpet = game.add.sprite(x, y, _keyUtils.Carpet);
      this.add(carpet);
    }
  }]);

  return RoomWithCarpet;
}(_room2.default);

exports.default = RoomWithCarpet;

},{"../constants/constants":1,"../constants/keyUtils":2,"../lib/room":9}],15:[function(require,module,exports){
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

var _room = require("../lib/room");

var _room2 = _interopRequireDefault(_room);

var _constants = require("../constants/constants");

var _keyUtils = require("../constants/keyUtils");

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

var RoomWithColoredCorners = function (_Room) {
  _inherits(RoomWithColoredCorners, _Room);

  function RoomWithColoredCorners() {
    _classCallCheck(this, RoomWithColoredCorners);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RoomWithColoredCorners).apply(this, arguments));
  }

  _createClass(RoomWithColoredCorners, [{
    key: "addAdditionalSprite",
    value: function addAdditionalSprite(game) {
      var spriteRoomWidth = this.width - 2 * _constants.WallSize;
      var spriteRoomHeight = this.height - 2 * _constants.WallSize;
      this.addCorner(game, this.originalX, this.originalY);
      this.addCorner(game, this.originalX + spriteRoomWidth - _constants.CornerWidth, this.originalY);

      this.addCorner(game, this.originalX, this.originalY + spriteRoomHeight - _constants.CornerHeight);
      this.addCorner(game, this.originalX + spriteRoomWidth - _constants.CornerWidth, this.originalY + spriteRoomHeight - _constants.CornerHeight);
    }
  }, {
    key: "addCorner",
    value: function addCorner(game, x, y) {
      var corner = game.add.sprite(x, y, _keyUtils.Corner);
      this.add(corner);
    }
  }]);

  return RoomWithColoredCorners;
}(_room2.default);

exports.default = RoomWithColoredCorners;

},{"../constants/constants":1,"../constants/keyUtils":2,"../lib/room":9}],16:[function(require,module,exports){
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

var _maze = require('lib/maze');

var _maze2 = _interopRequireDefault(_maze);

var _room = require('lib/room');

var _room2 = _interopRequireDefault(_room);

var _roomWithCarpet = require('object/roomWithCarpet');

var _roomWithCarpet2 = _interopRequireDefault(_roomWithCarpet);

var _roomWithColoredCorners = require('object/roomWithColoredCorners');

var _roomWithColoredCorners2 = _interopRequireDefault(_roomWithColoredCorners);

var _constants = require('constants/constants');

var _keyUtils = require('constants/keyUtils');

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).call(this));

    _this.useJsonData = false;
    _this.JSONData = null;
    _this.nbRooms = null;
    return _this;
  }

  _createClass(GameState, [{
    key: 'init',
    value: function init(data) {
      if (data !== undefined) {
        if (data.JSONData) {
          this.useJsonData = true;
          this.JSONData = JSONData;
        }
        if (data.nbRooms) {
          this.nbRooms = data.nbRooms;
        }
      }
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.time.advancedTiming = true;
      this.game.stage.backgroundColor = "#4488AA";
      this.game.world.setBounds(0, 0, _constants.WorldWitdth, _constants.WorldHeight);
      this.character = new _character2.default(this.game, 50, 200, _keyUtils.Character, 0);
      this.maze = new _maze2.default(this.game, this.game.world, _constants.WorldWitdth, _constants.WorldHeight, this.nbRooms, [_room2.default, _roomWithCarpet2.default, _roomWithColoredCorners2.default]);
      this.maze.generate(game, this.JSONData);
      var roomPosition = this.maze.getInitialRoom().borders().center;
      this.character.position.setTo(roomPosition.x, roomPosition.y);
      this.game.add.existing(this.character);
      this.game.camera.follow(this.character);

      this.game.mazeCreated.dispatch();
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.collide(this.character, this.maze.walls());
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image(_keyUtils.Character, PATH + '/character.png');
      this.game.load.image(_keyUtils.Carpet, PATH + '/carpet.png');
      this.game.load.image(_keyUtils.Corner, PATH + '/corner.png');
    }
  }, {
    key: 'render',
    value: function render() {
      this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"constants/constants":1,"constants/keyUtils":2,"lib/maze":8,"lib/room":9,"object/character":13,"object/roomWithCarpet":14,"object/roomWithColoredCorners":15}]},{},[3])
//# sourceMappingURL=map-generator.js.map
