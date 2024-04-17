import Rectangle from "./rectangle.js";
import Point from "./point.js";

describe("Rectangle tests", () => {
  test("Rectangle initializes", () => {
    try {
      new Rectangle(new Point(0, 0), new Point(1, 1));
    } catch (error) {
      throw new Error(error);
    }
  });

  test("Initializing Rectangle with improper position throws error", () => {
    const improperValues = ["something", 1, ["a", "b"], { a: 1, b: 2 }];

    const assertion = (value) => {
      expect(() => {
        new Rectangle(value, new Point(1, 1));
      }).toThrow();
    };

    improperValues.forEach(assertion);
  });

  test("Initializing Rectangle with improper size throws error", () => {
    const improperValues = ["something", 1, ["a", "b"], { a: 1, b: 2 }];

    const assertion = (value) => {
      expect(() => {
        new Rectangle(new Point(1, 1), value);
      }).toThrow();
    };

    improperValues.forEach(assertion);
  });

  test("Rectangle.position and size actually return position and size", () => {
    const position = new Point(1, 1);
    const size = new Point(2, 2);
    const rectangle = new Rectangle(position, size);

    expect(rectangle.position).toBe(position);
    expect(rectangle.size).toBe(size);
  });

  test("Rectangle dimension properties return proper dimensions", () => {
    const position = new Point(1, 1);
    const size = new Point(2, 2);
    const rectangle = new Rectangle(position, size);

    expect(rectangle.width).toBe(size.x);
    expect(rectangle.height).toBe(size.y);
    expect(rectangle.left).toBe(position.x);
    expect(rectangle.right).toBe(position.x + size.x);
    expect(rectangle.top).toBe(position.y);
    expect(rectangle.bottom).toBe(position.y + size.y);
    expect(rectangle.center.x).toBe(position.x + size.x / 2);
    expect(rectangle.center.y).toBe(position.y + size.y / 2);
  });

  test("Rectangle.contains checks for containment", () => {
    const position = new Point(0, 0);
    const size = new Point(5, 5);
    const rectangle = new Rectangle(position, size);

    const pointsInside = [
      new Point(1, 1),
      new Point(0, 3),
      new Point(3, 4),
      new Point(5, 0),
    ];
    const pointsOutside = [
      new Point(-1, 2),
      new Point(6, 3),
      new Point(13, -2),
      new Point(0, -1),
    ];

    const assertTrue = (value) => {
      expect(rectangle.contains(value)).toBe(true);
    };

    const assertFalse = (value) => {
      expect(rectangle.contains(value)).toBe(false);
    };

    pointsInside.forEach(assertTrue);
    pointsOutside.forEach(assertFalse);
  });
});
