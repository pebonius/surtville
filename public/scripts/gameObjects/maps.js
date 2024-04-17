import Tilemap from "../gameObjects/tilemap.js";

export default class Maps {
  constructor(gameScreen, data) {
    this.gameScreen = gameScreen;
    this.load(data);
  }
  getMapById(mapId) {
    return this.maps[mapId];
  }
  load(data) {
    this.maps = [];
    data.forEach((element) => {
      this.maps.push(new Tilemap(this.gameScreen, element));
    });
  }
}
