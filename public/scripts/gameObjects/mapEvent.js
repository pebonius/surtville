import Point from "../geometry/point.js";
import Debug from "../utilities/debug.js";
import { isNonEmptyString } from "../utilities/utilities.js";
import Entity from "./entity.js";
import { getSupportedAction, isConditionFulfilled } from "./actions.js";

export default class MapEvent extends Entity {
  constructor(gameScreen, map, data) {
    super(gameScreen);
    this.load(map, data);
  }
  onCollision(collider) {
    super.onCollision(collider);

    if (
      isConditionFulfilled(this.condition, this.conditionArgs, this.gameScreen)
    ) {
      this.playActions(collider);
    } else {
      this.letThrough(collider);
    }
  }
  playActions(collider) {
    if (Array.isArray(this.actions) && this.actions.length > 0) {
      this.actions.forEach((action) => {
        const supportedAction = getSupportedAction(
          action.name,
          this.gameScreen
        );
        supportedAction(...action.arguments);
      });
    }
  }
  letThrough(collider) {
    collider.placeOnMap(this.position, this.map);
  }
  load(map, data) {
    this.name = data.name;
    const position = new Point(data.posX, data.posY);
    this.placeOnMap(position, map);

    if (isNonEmptyString(data.sprite)) {
      this.sprite = this.gameScreen.content.getAssetByName(data.sprite);
    } else {
      this.sprite = null;
    }
    this.condition = data.condition;
    this.conditionArgs = data.conditionArgs;
    this.actions = data.actions;
  }
}
