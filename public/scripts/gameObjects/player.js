import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  constructor(gameScreen, data) {
    super(gameScreen);
    this.inputDelay = 10;
    this.inputCooldown = 0;
    this.load(data);
  }
  load(data) {
    this.name = data.name;
    this.sprite = this.gameScreen.content.getAssetByName(data.sprite);
    const startingMap = this.gameScreen.maps.getMapById(data.map);
    const startingPosition = new Point(data.posX, data.posY);
    this.placeOnMap(startingPosition, startingMap);
  }
  placeOnMap(targetPosition, targetMap) {
    const cachedPosition = this.position;
    const isEnteringNewMap = this.isEnteringNewMap(this.map, targetMap);
    this.position = new Point(targetPosition.x, targetPosition.y);
    this.map = targetMap;

    if (isEnteringNewMap) {
      this.onEnterMap(targetMap);
      return false;
    }
    this.onMoved(cachedPosition);
    return true;
  }
  update(input) {
    if (!this.gameScreen.ui.blocksPlayerInput()) {
      this.handleKeyInput(input);
    }
  }
  checkTurnUpdate() {
    if (this.endTurn) {
      this.map.onTurn(this);
    }
  }
  checkIfResetInputCooldown(input) {
    if (this.isInputCooldownReset(input)) {
      this.resetInputCooldown();
    }
  }
  resetInputCooldown() {
    this.inputCooldown = this.inputDelay;
  }
  updateInputCooldown() {
    if (this.inputCooldown > 0) {
      this.inputCooldown--;
    }
  }
  takesInput() {
    return this.inputCooldown == 0;
  }
  isInputCooldownReset(input) {
    const resettingInputs = [
      input.keys.UP,
      input.keys.DOWN,
      input.keys.LEFT,
      input.keys.RIGHT,
      input.keys.SHIFT,
      input.keys.CTRL,
      input.keys.NUM1,
      input.keys.NUM2,
      input.keys.NUM3,
      input.keys.NUM4,
      input.keys.NUM5,
      input.keys.NUM6,
      input.keys.NUM7,
      input.keys.NUM8,
      input.keys.NUM9,
      input.keys.NUM0,
    ];

    for (let i = 0; i < resettingInputs.length; i++) {
      if (input.isKeyDown(resettingInputs[i])) {
        this.resetInputCooldown();
        return;
      }
    }
  }
  wait() {
    Debug.log(`${this} is waiting`);
    return true;
  }
  handleKeyInput(input) {
    this.endTurn = false;

    this.updateInputCooldown();

    if (!this.takesInput()) {
      return;
    }

    if (
      input.isKeyDown(input.keys.NUM8) ||
      input.isKeyDown(input.keys.UP) ||
      input.isUpClick()
    ) {
      this.endTurn = this.move(
        new Point(this.position.x, this.position.y - 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM2) ||
      input.isKeyDown(input.keys.DOWN) ||
      input.isDownClick()
    ) {
      this.endTurn = this.move(
        new Point(this.position.x, this.position.y + 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM4) ||
      input.isKeyDown(input.keys.LEFT) ||
      input.isLeftClick()
    ) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM6) ||
      input.isKeyDown(input.keys.RIGHT) ||
      input.isRightClick()
    ) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM7)) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y - 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM9)) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y - 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM1)) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y + 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM3)) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y + 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM5) ||
      input.isKeyDown(input.keys.SHIFT)
    ) {
      this.endTurn = this.wait();
    }

    this.checkIfResetInputCooldown(input);

    this.checkTurnUpdate();
  }
  resolveCollision(collider) {
    collider.onCollision(this);
  }
}
