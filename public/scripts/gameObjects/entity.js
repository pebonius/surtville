import Point from "../geometry/point.js";
import { isDefined } from "../utilities/utilities.js";
import Debug from "../utilities/debug.js";

export default class Entity {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.name = "entity";
  }
  toString() {
    return this.name;
  }
  placeOnMap(targetPosition, targetMap) {
    const cachedPosition = this.position;
    const isEnteringNewMap = this.isEnteringNewMap(this.map, targetMap);
    this.removeFromMap();
    targetMap.setEntity(targetPosition, this);
    this.position = new Point(targetPosition.x, targetPosition.y);
    this.map = targetMap;

    if (isEnteringNewMap) {
      this.onEnterMap(targetMap);
      return false;
    }
    this.onMoved(cachedPosition);
    return true;
  }
  isEnteringNewMap(currentMap, targetMap) {
    return currentMap != targetMap;
  }
  removeFromMap() {
    if (isDefined(this.map) && isDefined(this.position)) {
      this.map.removeEntity(this);
    }
  }
  move(targetPosition, targetMap) {
    if (!this.canMoveTo(targetPosition, targetMap)) {
      return false;
    }

    const collider = this.map.getEntity(targetPosition);

    if (this.isCollision(collider)) {
      this.resolveCollision(collider);
      return true;
    }

    return this.placeOnMap(targetPosition, targetMap);
  }
  onMoved(previousPosition) {
    Debug.log(
      `${this} moved from [${previousPosition.x}, ${previousPosition.y}] to [${this.position.x}, ${this.position.y}], map ${this.map}`
    );
  }
  onEnterMap(map) {}
  moveAtRandom() {
    if (this.getPosition() instanceof Point) {
      const pos = this.getPosition();
      const targetPos = new Point(
        randomNumber(pos.x - 1, pos.x + 1),
        randomNumber(pos.y - 1, pos.y + 1)
      );
      this.move(targetPos, this.map);
    }
  }
  isCollision(collider) {
    return collider != null && typeof collider.onCollision === "function";
  }
  resolveCollision(collider) {}
  onCollision(collider) {
    Debug.log(`<<${collider}>> collided with <<${this}>>.`);
  }
  canMoveTo(targetPosition, targetMap) {
    return this.map.isWalkable(targetPosition);
  }
  onTurn() {}
}
