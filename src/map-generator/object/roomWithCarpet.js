import Room from "./room";
import {WallSize} from './constants';
import RoomSprite from './roomSprite';

import {CarpetWidth, CarpetHeight} from "./constants";

class RoomWithCarpet extends Room {

  addAdditionalSprite(game) {
    debugger
    console.log("salade")
    const x = this.roomSprite().x / 2 - CarpetWidth/2;
    const y = this.roomSprite().y / 2 - CarpetHeight/2;
    console.log("x", x)
    
    let carpet = game.add.sprite(x, y, 'Carpet');
    this.add(carpet);
  }

  render() {
    console.log("salt")
    // Display
    this.game.debug.spriteBounds(this.carpet);
    }

}

export default RoomWithCarpet;