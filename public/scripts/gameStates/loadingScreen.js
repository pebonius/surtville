import GameState from "./gameState.js";
import WelcomeScreen from "./welcomeScreen.js";
import { drawText } from "../utilities/graphics.js";

export default class LoadingScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.fontSize = this.canvas.width * 0.04;
    this.loadingFinished = false;
    this.loadingTextPosX = this.canvas.width / 3;
    this.loadingTextPosY = (this.canvas.height / 4) * 3;

    this.loadContent();
  }
  get labelText() {
    if (this.loadingFinished) {
      return "press ENTER";
    }
    return "loading...";
  }
  loadContent() {
    this.content.onFinishedLoading = () => {
      this.loadingFinished = true;
    };
    this.content.loadContent();
  }
  showWelcomeScreen() {
    this.gameStates.push(
      new WelcomeScreen(
        this.gameStates,
        this.canvas,
        this.input,
        this.content,
        this.sound
      )
    );
    this.kill();
  }
  update(input) {
    if (
      this.loadingFinished &&
      (input.isKeyPressed(input.keys.ENTER) || input.isEnterClick())
    ) {
      this.showWelcomeScreen();
    }
  }
  draw(context, canvas) {
    super.draw(context, canvas);
    drawText(
      context,
      this.labelText,
      this.fontSize,
      "white",
      this.loadingTextPosX,
      this.loadingTextPosY
    );
  }
}
