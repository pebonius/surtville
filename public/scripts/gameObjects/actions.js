import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import { isDefined, isFunction } from "../utilities/utilities.js";

export const getSupportedAction = (action, gameScreen) => {
  switch (action) {
    case "log":
      return (string) => {
        Debug.log(string);
      };
    case "setVariableValue":
      return (name, value) => {
        gameScreen.variables.setVariableValue(name, value);
      };
    case "changeVariableValue":
      return (name, change) => {
        gameScreen.variables.changeVariableValue(name, change);
      };
    case "movePlayer":
      return (posX, posY, mapId) => {
        const pos = new Point(posX, posY);
        const map = gameScreen.maps.getMapById(mapId);
        gameScreen.player.placeOnMap(pos, map);
      };
    case "playDialogue":
      return (messages) => {
        gameScreen.ui.playDialogue(messages);
      };
    case "playMusic":
      return (trackName, looped) => {
        const track = gameScreen.content.getAssetByName(trackName);
        gameScreen.sound.playMusic(track, looped);
      };
    case "endGame":
      return () => {
        gameScreen.endGame();
      };
    case "":
      return () => {};
    default:
      return () => {
        Debug.log(
          `<<${this}>> tried to call unsupported action <<${action}>>.`
        );
      };
  }
};

export const getSupportedCondition = (condition, gameScreen) => {
  switch (condition) {
    case "variableValueIs":
      return (variableName, value) => {
        return gameScreen.variables.variableValueIs(variableName, value);
      };
    case "variableValueIsNot":
      return (variableName, value) => {
        return gameScreen.variables.variableValueIsNot(variableName, value);
      };
    case "variableValueIsAtLeast":
      return (variableName, value) => {
        return gameScreen.variables.variableValueIsAtLeast(variableName, value);
      };
    case "variableValueIsNoMoreThan":
      return (variableName, value) => {
        return gameScreen.variables.variableValueIsNoMoreThan(
          variableName,
          value
        );
      };
    case "":
      return () => {
        return true;
      };
    default:
      return () => {
        Debug.log(
          `<<${this}>> tried to call unsupported condition <<${condition}>>.`
        );
      };
  }
};

export const isConditionFulfilled = (condition, conditionArgs, gameScreen) => {
  const supportedCondition = getSupportedCondition(condition, gameScreen);

  if (!isDefined(condition) || !isDefined(conditionArgs)) {
    return true;
  }

  return isFunction(supportedCondition) && supportedCondition(...conditionArgs);
};
