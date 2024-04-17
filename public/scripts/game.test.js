import Game from "./game.js";
import { JSDOM } from "jsdom";

describe("Game tests", () => {
  test("Game initializes", () => {
    const dom = new JSDOM(
      `<canvas id="canvas"></canvas>
    `
    );
    const document = dom.window.document;
    const canvas = document.getElementById("canvas");

    try {
      new Game(canvas);
    } catch (error) {
      throw new Error(error);
    }
  });
});
