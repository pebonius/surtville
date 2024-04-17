import Debug from "../utilities/debug.js";
import { cloneArray } from "../utilities/utilities.js";

export default class Variables {
  constructor(gameScreen, data) {
    this.gameScreen = gameScreen;
    this.variables = [];
    this.load(data);
  }
  addVariable(variableName, variableValue) {
    this.variables.push({ name: variableName, value: variableValue });
  }
  getVariableByName(name) {
    const variable = this.variables.find((element) => {
      return element.name === name;
    });
    return variable;
  }
  setVariableValue(name, value) {
    const variable = this.getVariableByName(name);

    this.updateVariableValue(variable, value);
  }
  changeVariableValue(name, change) {
    const variable = this.getVariableByName(name);
    const newValue = variable.value + change;

    this.updateVariableValue(variable, newValue);
  }
  updateVariableValue(variable, value) {
    variable.value = value;
  }
  variableValueIs(variableName, value) {
    const variable = this.getVariableByName(variableName);

    return variable.value == value;
  }
  variableValueIsNot(variableName, value) {
    return !this.variableValueIs(variableName, value);
  }
  variableValueIsAtLeast(variableName, value) {
    const variable = this.getVariableByName(variableName);

    return variable.value >= value;
  }
  variableValueIsNoMoreThan(variableName, value) {
    const variable = this.getVariableByName(variableName);

    return variable.value <= value;
  }
  load(data) {
    data.forEach((element) => {
      this.addVariable(element.name, element.value);
    });
  }
}
