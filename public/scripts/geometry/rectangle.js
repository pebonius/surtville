import Point from "./point.js";
import { checkForTypeErrorNum, randomNumber } from "../utilities/utilities.js";

export default class Rectangle {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
  get position() {
    return this._position;
  }
  set position(value) {
    checkForTypeErrorNum(value.x, "position.x");
    checkForTypeErrorNum(value.y, "position.y");
    this._position = value;
  }
  get size() {
    return this._size;
  }
  set size(value) {
    checkForTypeErrorNum(value.x, "size.x");
    checkForTypeErrorNum(value.y, "size.y");

    if (value.x <= 0 || value.y <= 0) {
      throw new RangeError("size.x and size.y must be bigger than 0");
    }
    this._size = value;
  }
  get width() {
    return this.size.x;
  }
  get height() {
    return this.size.y;
  }
  get left() {
    return this.position.x;
  }
  get right() {
    return this.left + this.width;
  }
  get top() {
    return this.position.y;
  }
  get bottom() {
    return this.top + this.height;
  }
  get center() {
    return new Point(this.left + this.width / 2, this.top + this.height / 2);
  }
  get randomPointWithin() {
    return new Point(
      randomNumber(this.left, this.right),
      randomNumber(this.top, this.bottom)
    );
  }
  contains(point) {
    return (
      point.x >= this.left &&
      point.x <= this.right &&
      point.y >= this.top &&
      point.y <= this.bottom
    );
  }
  sidesContain(point) {
    return (
      point.x == this.left ||
      point.x == this.right ||
      point.y == this.top ||
      point.y == this.bottom
    );
  }
  static intersects(rectA, rectB) {
    if (
      rectA.position.x > rectB.position.x + rectB.size.x ||
      rectB.position.x > rectA.position.x + rectA.size.x
    ) {
      return false;
    }
    if (
      rectA.position.y > rectB.position.y + rectB.size.y ||
      rectB.position.y > rectA.position.y + rectA.size.y
    ) {
      return false;
    }
    return true;
  }
}
