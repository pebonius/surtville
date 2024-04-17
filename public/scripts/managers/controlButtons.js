import Point from "../geometry/point.js";
import { drawRectangle, drawText } from "../utilities/graphics.js";
import Debug from "../utilities/debug.js";
import Rectangle from "../geometry/rectangle.js";

export default class ControlButtons {
  constructor(canvas) {
    this.buttonSize = new Point(canvas.width * 0.09, canvas.width * 0.09);
    this.arrowsPosition = new Point(this.buttonSize.x * 2, canvas.height * 0.5);
    this.arrowsFontSize = this.buttonSize.x * 0.5;
    this.arrrowBgColor = "rgba(244, 244, 244, 0.3)";
    this.arrowFontColor = "black";
    this.textOffset = this.buttonSize.x * 0.3;

    this.upArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 0.5,
      this.arrowsPosition.y - this.buttonSize.y * 1.5
    );

    this.upArrowRect = new Rectangle(this.upArrowPos, this.buttonSize);
    Debug.log(this.upArrowRect.position.x);

    this.downArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 0.5,
      this.arrowsPosition.y + this.buttonSize.y * 0.5
    );

    this.downArrowRect = new Rectangle(this.downArrowPos, this.buttonSize);

    this.leftArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 1.5,
      this.arrowsPosition.y - this.buttonSize.y * 0.5
    );

    this.leftArrowRect = new Rectangle(this.leftArrowPos, this.buttonSize);

    this.rightArrowPos = new Point(
      this.arrowsPosition.x + this.buttonSize.x * 0.5,
      this.arrowsPosition.y - this.buttonSize.y * 0.5
    );

    this.rightArrowRect = new Rectangle(this.rightArrowPos, this.buttonSize);

    this.enterPos = new Point(
      canvas.width - this.buttonSize.x * 2.5,
      this.arrowsPosition.y - this.buttonSize.y * 0.5
    );
    this.enterRect = new Rectangle(this.enterPos, this.buttonSize);
  }
  draw(context) {
    drawRectangle(context, this.arrowsPosition, new Point(1, 1), "red");
    this.drawButton(context, this.upArrowPos, "^");
    this.drawButton(context, this.downArrowPos, "v");
    this.drawButton(context, this.leftArrowPos, "<");
    this.drawButton(context, this.rightArrowPos, ">");
    this.drawButton(context, this.enterPos, "⏎");
  }
  drawButton(context, position, text) {
    drawRectangle(context, position, this.buttonSize, this.arrrowBgColor);
    drawText(
      context,
      text,
      this.arrowsFontSize,
      this.arrowFontColor,
      position.x + this.textOffset,
      position.y + this.textOffset
    );
  }
}
