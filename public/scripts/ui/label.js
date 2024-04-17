import Point from "../geometry/point.js";
import {
  checkForTypeError,
  checkForTypeErrorNum,
  isNonEmptyString,
  isString,
} from "../utilities/utilities.js";
import {
  drawRectangle,
  drawText,
  setContextFont,
} from "../utilities/graphics.js";

export default class Label {
  constructor(text, position, fontSize, color, bgColor) {
    this.position = position;
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
    if (bgColor !== undefined) {
      this.backgroundColor = bgColor;
    }
  }
  get position() {
    return this._position;
  }
  set position(value) {
    checkForTypeError(value, "position", Point);

    this._position = value;
  }
  get text() {
    return this._text;
  }
  set text(value) {
    if (!isString(value)) {
      throw new Error("text must be a string");
    }

    this._text = value;
  }
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value) {
    checkForTypeErrorNum(value, "fontSize");

    if (value <= 0) {
      throw new RangeError("fontSize must be > 0");
    }

    this._fontSize = value;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    if (value === undefined) {
      return;
    }

    if (!isNonEmptyString(value)) {
      throw new Error("backgroundColor must be a non-empty string");
    }

    this._backgroundColor = value;
  }
  getTextWidth(context) {
    return context.measureText(this.text).width;
  }
  updateText(text) {
    this.text = text;
  }
  draw(
    context,
    position = this.position,
    size = this.fontSize,
    color = this.color
  ) {
    setContextFont(context, size);
    this.drawBackground(context, position);
    drawText(context, this.text, size, color, position.x, position.y);
  }
  drawBackground(context, position) {
    if (this.backgroundColor !== undefined) {
      const textWidth = this.getTextWidth(context);
      const backgroundSize = new Point(textWidth, this.fontSize);
      drawRectangle(context, position, backgroundSize, this.backgroundColor);
    }
  }
}
