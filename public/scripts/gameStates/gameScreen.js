import Maps from "../gameObjects/maps.js";
import Player from "../gameObjects/player.js";
import UI from "../gameObjects/ui.js";
import Variables from "../gameObjects/variables.js";
import GameState from "./gameState.js";
import WelcomeScreen from "./welcomeScreen.js";

export default class GameScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.ui = new UI(this);
    this.load();
  }
  update(input) {
    this.ui.update(input);
    this.player.update(input);
  }
  draw(context, canvas) {
    this.player.map.draw(context);
    this.ui.draw(context);
  }
  load() {
    this.loadMaps();
    this.loadPlayer();
    this.loadVariables();
    this.playStartingEvent();
  }
  playStartingEvent() {
    this.sound.playMusic(null);
  }
  loadPlayer() {
    this.player = new Player(this, this.content.data.playerData);
  }
  loadVariables() {
    this.variables = new Variables(this, this.content.data.variables);
  }
  loadMaps() {
    this.maps = new Maps(this, this.content.data.maps);
  }
  endGame() {
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
}
