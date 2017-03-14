import Room from "./room";
import RoomSprite from './roomSprite';

import {CarpetWidth, CarpetHeight, WallSize} from "../constants/constants";

import { Carpet } from "../constants/keyUtils";

class RoomWithCarpet extends Room {

  addAdditionalSprite(game) {
    const heightRoom = this.height - 2 * WallSize;
    const widthRoom = this.width - 2 * WallSize;
    const x = this.originalX + widthRoom / 2 - CarpetWidth/2;
    const y = this.originalY + heightRoom / 2 - CarpetHeight/2;

    let carpet = game.add.sprite(x, y, Carpet);
    this.add(carpet);
  }
}

export default RoomWithCarpet;