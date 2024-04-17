import GameState from "./gameState.js";
import Point from "../geometry/point.js";
import Label from "../ui/label.js";
import GameScreen from "./gameScreen.js";
import AboutScreen from "./aboutScreen.js";
import { drawImage } from "../utilities/graphics.js";

export default class WelcomeScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.title = content.data.meta.title;
    this.controlLabels = [];
    this.firstLabelPosition = new Point(
      this.canvas.width / 4,
      (this.canvas.height / 7) * 5
    );
    this.fontSize = this.canvas.width * 0.04;
    this.titleFontSize = this.canvas.width * 0.07;
    this.menuEntryPadding = this.canvas.width * 0.05;
    this.addBackgroundImage();
    this.addTitle();
    this.addControlLabel("enter", "start game");
    this.addControlLabel("down", "about");
    this.playMenuMusic();
  }
  playMenuMusic() {
    this.sound.playMusic(
      this.content.getAssetByName(this.content.data.meta.menuMusic),
      true
    );
  }

  addBackgroundImage() {
    this.bgImage = this.content.getAssetByName(
      this.content.data.meta.menuBackground
    );
    this.bgPos = new Point(0, 0);
    this.bgSize = new Point(this.canvas.width, this.canvas.height);
  }
  addTitle() {
    this.titleLabel = new Label(
      this.title,
      new Point(this.canvas.width / 5, (this.canvas.height / 9) * 1),
      this.titleFontSize,
      "cyan"
    );
  }
  addControlLabel(keyname, functionName) {
    const labelText = keyname.toUpperCase() + " - " + functionName;
    this.controlLabels.push(
      new Label(
        labelText,
        new Point(
          this.firstLabelPosition.x,
          this.firstLabelPosition.y +
            this.menuEntryPadding * this.controlLabels.length
        ),
        this.fontSize,
        "pink",
        "red"
      )
    );
  }
  startGame() {
    this.gameStates.push(
      new GameScreen(
        this.gameStates,
        this.canvas,
        this.input,
        this.content,
        this.sound
      )
    );
    this.kill();
  }
  openAbout() {
    this.gameStates.push(
      new AboutScreen(
        this.gameStates,
        this.canvas,
        this.input,
        this.content,
        this.sound
      )
    );
  }
  update(input) {
    if (input.isKeyPressed(input.keys.ENTER) || input.isEnterClick()) {
      this.startGame();
    }
    if (input.isKeyPressed(input.keys.DOWN) || input.isDownClick()) {
      this.openAbout();
    }
  }
  draw(context, canvas) {
    super.draw(context, canvas);
    drawImage(context, this.bgImage, this.bgPos, this.bgSize);
    this.titleLabel.draw(context);
    this.drawControlLabels(context);
  }
  drawControlLabels(context) {
    this.controlLabels.forEach((e) => e.draw(context));
  }
}
