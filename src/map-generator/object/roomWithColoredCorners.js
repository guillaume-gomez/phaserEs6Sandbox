import Room from "./room";
import RoomSprite from './roomSprite';

import {CornerWidth, CornerHeight, WallSize} from "./constants";

class RoomWithColoredCorners extends Room {

  addAdditionalSprite(game) {
    const spriteRoomWidth = this.width - (2 * WallSize);
    const spriteRoomHeight = this.height - (2 * WallSize);
    this.addCorner(game, this.originalX, this.originalY);
    this.addCorner(game, this.originalX + spriteRoomHeight - CornerWidth, this.originalY);

    this.addCorner(game, this.originalX, this.originalY + spriteRoomHeight - CornerHeight);
    this.addCorner(game, this.originalX + spriteRoomWidth  - CornerWidth, this.originalY + spriteRoomHeight - CornerHeight);
  }

  addCorner(game, x, y) {
    const corner = game.add.sprite(x, y, 'Corner');
    this.add(corner);
  }
}

export default RoomWithColoredCorners;