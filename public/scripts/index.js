import Game from "./game.js";

window.onload = () => {
  const game = new Game(document.getElementById("canvas"));
  game.initialize();
};
