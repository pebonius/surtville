import Point from "../geometry/point.js";
import {
  checkForArray,
  maxNumber,
  isFunction,
  arrayContains,
  cloneArray,
} from "../utilities/utilities.js";
import Debug from "../utilities/debug.js";
import ControlButtons from "./controlButtons.js";

export default class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keysDown = [];
    this.currentKeysDown = [];
    this.previousKeysDown = [];
    this.keys = {};
    this.controlButtons = new ControlButtons(canvas);
  }
  addKeys() {
    this.keys = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      ESCAPE: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INSERT: 45,
      DELETE: 46,
      K0: 48,
      K1: 49,
      K2: 50,
      K3: 51,
      K4: 52,
      K5: 53,
      K6: 54,
      K7: 55,
      K8: 56,
      K9: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      SELECT: 93,
      NUM0: 96,
      NUM1: 97,
      NUM2: 98,
      NUM3: 99,
      NUM4: 100,
      NUM5: 101,
      NUM6: 102,
      NUM7: 103,
      NUM8: 104,
      NUM9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBTRACT: 109,
      DECIMAL: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      MINUS: 173,
      SEMICOLON: 186,
      EQUAL: 187,
      COMMA: 188,
      DASH: 189,
      PERIOD: 190,
      SLASH: 191,
      BACKQUOTE: 192,
      BACKSLASH: 220,
      BRACKETLEFT: 219,
      BRACKETRIGHT: 221,
      QUOTE: 222,
    };
    Object.freeze(this.keys);
  }
  addEvents() {
    document.addEventListener(
      "keydown",
      (e) => {
        this.keyDown(e);
      },
      false
    );
    document.addEventListener(
      "keyup",
      (e) => {
        this.keyUp(e);
      },
      false
    );
    window.addEventListener(
      "keydown",
      (e) => {
        if (
          [
            this.keys.SPACE,
            this.keys.UP,
            this.keys.DOWN,
            this.keys.LEFT,
            this.keys.RIGHT,
            this.keys.SLASH,
          ].indexOf(e.keyCode) > -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
    this.canvas.addEventListener("pointerdown", (e) => {
      this.isclick = true;

      const bounds = this.canvas.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const clickPos = new Point(x, y);

      const upArrowRect = this.controlButtons.upArrowRect;
      const downArrowRect = this.controlButtons.downArrowRect;
      const leftArrowRect = this.controlButtons.leftArrowRect;
      const rightArrowRect = this.controlButtons.rightArrowRect;
      const enterRect = this.controlButtons.enterRect;

      if (upArrowRect.contains(clickPos)) {
        this.upclick = true;
      } else if (downArrowRect.contains(clickPos)) {
        this.downclick = true;
      } else if (leftArrowRect.contains(clickPos)) {
        this.leftclick = true;
      } else if (rightArrowRect.contains(clickPos)) {
        this.rightclick = true;
      } else if (enterRect.contains(clickPos)) {
        this.enterclick = true;
      }
    });
    this.canvas.addEventListener("pointerup", (e) => {
      this.consumeClick();
    });
    this.canvas.addEventListener("pointercancel", (e) => {
      this.consumeClick();
    });
  }
  isClick() {
    const click = this.isclick;
    this.consumeClick();
    return click;
  }
  isUpClick() {
    const click = this.upclick;
    this.upclick = false;
    this.isclick = false;
    return click;
  }
  isDownClick() {
    const click = this.downclick;
    this.downclick = false;
    this.isclick = false;
    return click;
  }
  isLeftClick() {
    const click = this.leftclick;
    this.leftclick = false;
    this.isclick = false;
    return click;
  }
  isRightClick() {
    const click = this.rightclick;
    this.rightclick = false;
    this.isclick = false;
    return click;
  }
  isEnterClick() {
    const click = this.enterclick;
    this.enterclick = false;
    this.isclick = false;
    return click;
  }
  consumeClick() {
    this.isclick = false;
    this.upclick = false;
    this.downclick = false;
    this.leftclick = false;
    this.rightclick = false;
    this.enterclick = false;
  }
  cacheKeysDown() {
    this.previousKeysDown = cloneArray(this.keysDown);
  }
  keyDown(e) {
    this.keysDown[e.keyCode] = true;
  }
  keyUp(e) {
    this.keysDown[e.keyCode] = false;
  }
  update() {
    this.previousKeysDown = cloneArray(this.currentKeysDown);
    this.currentKeysDown = cloneArray(this.keysDown);
  }
  draw(context) {
    this.controlButtons.draw(context);
  }
  isKeyPressed(key) {
    return this.currentKeysDown[key] && this.previousKeysDown[key] !== true;
  }
  isKeyDown(key) {
    return this.currentKeysDown[key];
  }
  cursorPosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(e.clientX - rect.left, e.clientY - rect.top);
  }
}
