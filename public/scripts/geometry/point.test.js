import Point from "./point.js";

describe("Point tests", () => {
  test("Point initializes", () => {
    try {
      new Point(1, 2);
    } catch (error) {
      throw new Error(error);
    }
  });

  test("distance between Point(0, 0) and Point(0, 0) is 0", () => {
    expect(Point.distance(new Point(0, 0), new Point(0, 0))).toBe(0);
  });

  test("distance between Point(1, 1) and Point(1, 2) is 1", () => {
    expect(Point.distance(new Point(1, 1), new Point(1, 2))).toBe(1);
  });

  test("distance between Point(-1, 0) and Point(1, 0) is 2", () => {
    expect(Point.distance(new Point(-1, 0), new Point(1, 0))).toBe(2);
  });

  test("distance between Point(0, 0) and 1 throws", () => {
    expect(() => {
      Point.distance(new Point(0, 0), 1);
    }).toThrow(TypeError);
  });
});
