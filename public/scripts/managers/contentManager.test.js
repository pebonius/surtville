import ContentManager from "./contentManager.js";

describe("ContentManager tests", () => {
  test("ContentManager initializes", () => {
    try {
      new ContentManager();
    } catch (error) {
      throw new Error(error);
    }
  });

  test("ContentManager is not loading anything when initialized", () => {
    const content = new ContentManager();

    expect(content.loadingAllTriggered).toBe(false);
    expect(content.assetsCurrentlyLoading.length).toBe(0);
    expect(content.finishedLoadingAssets).toBe(false);
  });
});
