import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import { drawImage } from "../utilities/graphics.js";
import {
  arrayContains,
  checkForProps,
  cloneArray,
  isDefined,
  isNumber,
  removeFromArray,
} from "../utilities/utilities.js";
import MapEvent from "./mapEvent.js";
import { isConditionFulfilled } from "./actions.js";

export default class Tilemap {
  constructor(gameScreen, data) {
    this.gameScreen = gameScreen;
    this.tileSize = new Point(
      this.gameScreen.canvas.width / 10,
      this.gameScreen.canvas.height / 10
    );
    this.load(data);
    this.tileset = this.gameScreen.content.getAssetByName("town_tiles");
    this.tilesetTileSize = 16;
  }
  toString() {
    return this.name;
  }
  get width() {
    return this.tiles.length;
  }
  get height() {
    return this.tiles[0].length;
  }
  addEventsLayer() {
    this.events = new Array(this.height);

    for (var i = 0; i < this.events.length; i++) {
      this.events[i] = new Array(this.width);
    }
  }
  containsPosition(pos) {
    return (
      pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height
    );
  }
  getTile(pos) {
    if (this.containsPosition(pos)) {
      return this.tiles[pos.y][pos.x];
    }
    return null;
  }
  getTileImage(tileId) {
    return this.gameScreen.content.getAssetByName(tileId);
  }
  getTileWalkable(tileId) {
    return arrayContains(this.walkableTiles, tileId);
  }
  isWalkable(pos) {
    return this.getTileWalkable(this.getTile(pos));
  }
  tilesetWidthInTiles = () => {
    return Math.ceil(this.tileset.width / this.tilesetTileSize);
  };
  tileToCol = (tile) => {
    const row = Math.floor(tile / this.tilesetWidthInTiles());
    return tile - row * this.tilesetWidthInTiles();
  };
  tileToRow = (tile) => {
    return Math.floor(tile / this.tilesetWidthInTiles());
  };
  drawTile(pos, context) {
    const tileId = this.tiles[pos.y][pos.x];
    if (tileId === undefined) {
      return;
    }

    if (!isNumber(tileId)) {
      throw new Error(`tileId should be a number, and it's ${tileId}`);
    }

    const tilePos = new Point(pos.x * this.tileSize.x, pos.y * this.tileSize.y);

    context.drawImage(
      this.tileset,
      this.tileToCol(tileId) * this.tilesetTileSize,
      this.tileToRow(tileId) * this.tilesetTileSize,
      this.tilesetTileSize,
      this.tilesetTileSize,
      tilePos.x,
      tilePos.y,
      this.tileSize.x,
      this.tileSize.y
    );
  }
  getEntity(pos) {
    if (this.containsPosition(pos)) {
      return this.events[pos.y][pos.x];
    }
    return null;
  }
  setEntity(pos, value) {
    if (this.containsPosition(pos)) {
      this.events[pos.y][pos.x] = value;
    }
  }
  removeEntity(value) {
    this.setEntity(value.position, null);
  }
  drawEvent(pos, context) {
    const entity = this.getEntity(pos);

    if (!isDefined(entity) || !isDefined(entity.sprite)) {
      return;
    }

    if (
      !isConditionFulfilled(
        entity.condition,
        entity.conditionArgs,
        this.gameScreen
      )
    ) {
      return;
    }

    const transformedPos = new Point(
      pos.x * this.tileSize.x,
      pos.y * this.tileSize.y
    );

    drawImage(context, entity.sprite, transformedPos, this.tileSize);
  }
  drawPlayer(context) {
    const player = this.gameScreen.player;
    const pos = player.position;

    const transformedPos = new Point(
      pos.x * this.tileSize.x,
      pos.y * this.tileSize.y
    );

    drawImage(context, player.sprite, transformedPos, this.tileSize);
  }
  draw(context) {
    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) {
        var pos = new Point(x, y);
        this.drawTile(pos, context);
        this.drawEvent(pos, context);
      }
    this.drawPlayer(context);
  }
  // TODO: drawFromCamera(context, camera) {
  //   const cameraPos = camera.position;
  //   for (let y = cameraPos.y; y < cameraPos.y + camera.viewportSize.y; y++)
  //     for (let x = cameraPos.x; x < cameraPos.x + camera.viewportSize.x; x++) {
  //       var pos = new Point(x, y);
  //       this.drawTile(pos, context);
  //     }
  // }
  onTurn(player) {
    // TODO: turn entities on the map
  }
  load(data) {
    this.name = data.name;
    this.walkableTiles = cloneArray(data.walkableTiles);
    this.tiles = cloneArray(data.tiles);
    this.addEventsLayer();
    data.events.forEach((element) => {
      const newEvent = new MapEvent(this.gameScreen, this, element);
    });
  }
}
