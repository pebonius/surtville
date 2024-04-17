import { clearContext } from "../utilities/graphics.js";
import { checkForArray } from "../utilities/utilities.js";

export default class GameState {
  constructor(gameStates) {
    this.gameStates = gameStates;
    if (new.target === GameState) {
      throw TypeError("Cannot instantiate abstract class GameState.");
    }
    this.isDead = false;
  }
  get gameStates() {
    return this._gameStates;
  }
  set gameStates(value) {
    checkForArray(value, "gameStates");
    this._gameStates = value;
  }
  kill() {
    this.isDead = true;
  }
  update(input) {}
  draw(context, canvas) {
    clearContext(context, canvas);
  }
}
