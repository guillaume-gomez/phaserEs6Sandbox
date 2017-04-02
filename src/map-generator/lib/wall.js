import {WallSize, WallColor} from './constants';
import Block from "./block";

class Wall extends Block {

  constructor(game, x, y, key) {
    super(game, x, y, key, WallColor, WallSize, WallSize)
  }
}

export default Wall;