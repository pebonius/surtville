import { isNonEmptyString, noCacheInit } from "../utilities/utilities.js";

export default class CreditsManager {
  constructor() {}
  tryFetchCredits(source) {
    if (!isNonEmptyString(source)) {
      console.log("Credits file path incorrect.");
      return;
    }
    try {
      this.fetchCredits(source);
    } catch {
      console.log("Could not load CREDITS.txt");
    }
  }
  fetchCredits(source) {
    const request = new Request(source);
    const init = noCacheInit();

    fetch(request, init).then((response) => {
      if (response.status !== 200) {
        console.log("Could not fetch credits file.");
        return;
      }

      response.text().then((data) => {
        this.logCredits(data);
      });
    });
  }
  logCredits(text) {
    console.log(text);
  }
}
