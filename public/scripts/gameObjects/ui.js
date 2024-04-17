import Dialogue from "./dialogue.js";

export default class UI {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.dialogue = new Dialogue(gameScreen);
  }
  blocksPlayerInput() {
    return this.dialogue.hasMessages();
  }
  playDialogue(messages) {
    this.dialogue.playDialogue(messages);
  }
  update(input) {
    this.dialogue.update(input);
  }
  draw(context) {
    this.dialogue.draw(context);
  }
}
