import {
  clamp,
  isNumber,
  isFloat,
  isNonEmptyString,
  passPercentileRoll,
  checkForTypeError,
  checkForArray,
  checkForTypeErrorNum,
  isFunction,
  isBool,
  hasValue,
  hasProperty,
  clearArray,
  firstElementInArray,
  lastElementInArray,
  arrayContains,
  cloneArray,
  removeFromArray,
  isString,
} from "./utilities.js";

describe("clamp tests", () => {
  test("clamp(-10, 0, 10) returns 0", () => {
    expect(clamp(-10, 0, 10)).toBe(0);
  });

  test("clamp(100, 0, 10) returns 10", () => {
    expect(clamp(100, 0, 10)).toBe(10);
  });

  test("clamp(7, 0, 10) returns 7", () => {
    expect(clamp(7, 0, 10)).toBe(7);
  });
});

describe("isNumber tests", () => {
  test("isNumber(1) returns true", () => {
    expect(isNumber(1)).toBe(true);
  });

  test("isNumber(0.123) returns true", () => {
    expect(isNumber(0.123)).toBe(true);
  });

  test("isNumber(-90.45) returns true", () => {
    expect(isNumber(-90.45)).toBe(true);
  });

  test("isNumber(string) returns false", () => {
    expect(isNumber("some string")).toBe(false);
  });

  test("isNumber(array) returns false", () => {
    expect(isNumber(new Array(3))).toBe(false);
  });
});

describe("isFloat tests", () => {
  test("isFloat(1.32) returns true", () => {
    expect(isFloat(1.32)).toBe(true);
  });

  test("isFloat(1) returns false", () => {
    expect(isFloat(1)).toBe(false);
  });

  test("isFloat(-90.45) returns true", () => {
    expect(isFloat(-90.45)).toBe(true);
  });

  test("isFloat(string) returns false", () => {
    expect(isFloat("some string")).toBe(false);
  });

  test("isFloat(array) returns false", () => {
    expect(isFloat(new Array(3))).toBe(false);
  });
});

describe("isString tests", () => {
  test("isString returns true for strings", () => {
    const strings = ["", "something"];

    strings.forEach((element) => {
      expect(isString(element)).toBe(true);
    });
  });

  test("isString returns false for non-strings", () => {
    const nonStrings = [1, false, {}, NaN, new Array(1)];

    nonStrings.forEach((element) => {
      expect(isString(element)).toBe(false);
    });
  });
});

describe("isNonEmptyString tests", () => {
  test("isNonEmptyString(123) returns false", () => {
    expect(isNonEmptyString(123)).toBe(false);
  });

  test("isNonEmptyString(str) returns false", () => {
    const str = "something";
    expect(isNonEmptyString(str)).toBe(true);
  });

  test("isNonEmptyString(emptyStr) returns false", () => {
    const emptyStr = "";
    expect(isNonEmptyString(emptyStr)).toBe(false);
  });

  test("isNonEmptyString(array) returns false", () => {
    expect(isNonEmptyString(new Array(3))).toBe(false);
  });
});

describe("passPercentileRoll tests", () => {
  test("passPercentileRoll(5) returns true in ~5% cases", () => {
    let passes = 0;
    const magnitude = 10;

    for (let i = 0; i < 100 * magnitude; i++) {
      if (passPercentileRoll(5)) {
        passes++;
      }
    }

    passes /= magnitude;

    expect(passes).toBeGreaterThan(3);
    expect(passes).toBeLessThan(7);
  });

  test("passPercentileRoll(0) never returns true", () => {
    let passes = 0;

    for (let i = 0; i < 100; i++) {
      if (passPercentileRoll(0)) {
        passes++;
      }
    }

    expect(passes).toBe(0);
  });

  test("passPercentileRoll(100) always returns true", () => {
    let passes = 0;

    for (let i = 0; i < 100; i++) {
      if (passPercentileRoll(100)) {
        passes++;
      }
    }

    expect(passes).toBe(100);
  });
});

describe("checkForTypeError tests", () => {
  test("checkForTypeError throws TypeError when type doesn't match", () => {
    class SomeClass {
      constructor() {}
    }
    const someNumber = 1;

    expect(() => {
      checkForTypeError(someNumber, "someNumber", SomeClass);
    }).toThrow();
  });

  test("checkForTypeError does not throw when type matches", () => {
    class SomeClass {
      constructor() {}
    }
    const testType = SomeClass;
    const testObject = new testType();

    try {
      checkForTypeError(testObject, "testObject", testType);
    } catch {
      throw new Error();
    }
  });
});

describe("checkForTypeErrorNum tests", () => {
  test("checkForTypeErrorNum throws TypeError when passed a non-number", () => {
    const someString = "this is a string";

    expect(() => {
      checkForTypeErrorNum(someString, "someString");
    }).toThrow();
  });

  test("checkForTypeErrorNum does not throw when passed a number", () => {
    const someNumber = 123;

    try {
      checkForTypeErrorNum(someNumber, "someNumber");
    } catch {
      throw new Error();
    }
  });
});

describe("checkForArray tests", () => {
  test("checkForArray throws TypeError when passed a non-Array", () => {
    const someNumber = 1;

    expect(() => {
      checkForArray(someNumber, "someNumber");
    }).toThrow();
  });

  test("checkForArray does not throw when passed an Array", () => {
    const someArray = new Array();

    try {
      checkForArray(someArray, "someArray");
    } catch {
      throw new Error();
    }
  });
});

describe("clearArray tests", () => {
  test("clearArray throws TypeError when passed a non-Array", () => {
    const someNumber = 1;

    expect(() => {
      clearArray(someNumber, "someNumber");
    }).toThrow();
  });

  test("clearArray clears an array", () => {
    const someArray = [1, 2, 3];

    clearArray(someArray);

    expect(someArray.length).toBe(0);
  });
});

describe("firstElementInArray tests", () => {
  test("firstElementInArray throws TypeError when passed a non-Array", () => {
    const someNumber = 1;

    expect(() => {
      firstElementInArray(someNumber, "someNumber");
    }).toThrow();
  });

  test("firstElementInArray returns first element of array", () => {
    const someArray = [1, 2, 3];

    expect(firstElementInArray(someArray)).toBe(1);
  });

  test("firstElementInArray returns undefined for empty array", () => {
    const emptyArray = [];

    expect(firstElementInArray(emptyArray)).toBe(undefined);
  });
});

describe("lastElementInArray tests", () => {
  test("lastElementInArray throws TypeError when passed a non-Array", () => {
    const someNumber = 1;

    expect(() => {
      lastElementInArray(someNumber, "someNumber");
    }).toThrow();
  });

  test("lastElementInArray returns first element of array", () => {
    const someArray = [1, 2, 3];

    expect(lastElementInArray(someArray)).toBe(3);
  });

  test("lastElementInArray returns undefined for empty array", () => {
    const emptyArray = [];

    expect(lastElementInArray(emptyArray)).toBe(undefined);
  });
});

describe("removeFromArray tests", () => {
  test("removeFromArray throws TypeError when passed a non-Array", () => {
    const someNumber = 1;

    expect(() => {
      removeFromArray(someNumber, 1);
    }).toThrow();
  });

  test("removeFromArray throws if array doesn't contain element", () => {
    const someArray = [1, 2, 3];

    expect(() => {
      removeFromArray(someArray, 4);
    }).toThrow();
  });

  test("removeFromArray removes contained element from array", () => {
    const someArray = [1, 2, 3];
    removeFromArray(someArray, 2);
    const expectedArray = [1, 3];

    expect(someArray.toString()).toBe(expectedArray.toString());
  });
});

describe("arrayContains tests", () => {
  test("arrayContains returns true when passed a contained element", () => {
    const elements = [0, "something", true, NaN, {}];
    const arr = [1, 2, 3];

    elements.forEach((element) => {
      arr.push(element);
      expect(arrayContains(arr, element)).toBe(true);
    });
  });

  test("arrayContains returns false when passed a non-contained element", () => {
    const elements = [0, "something", true, NaN, {}];
    const arr = [1, 2, 3];

    elements.forEach((element) => {
      expect(arrayContains(arr, element)).toBe(false);
    });
  });

  test("arrayContains throws TypeError when passed a non-Array", () => {
    const values = [0, "something", true, NaN, {}];

    values.forEach((element) => {
      expect(() => {
        arrayContains(element, 1);
      }).toThrow();
    });
  });
});

describe("cloneArray tests", () => {
  test("cloneArray returns an array with same elements", () => {
    const arr = [1, "text", true];
    const clone = cloneArray(arr);

    clone.forEach((element, i) => {
      expect(element).toBe(arr[i]);
    });
  });
});

describe("isFunction tests", () => {
  test("isFunction returns true when passed a function", () => {
    const foo = () => {
      console.log("beep");
    };

    expect(isFunction(foo)).toBe(true);
  });

  test("isFunction returns false when passed a string", () => {
    expect(isFunction("some string")).toBe(false);
  });
});

describe("isBool tests", () => {
  test("isBool returns true when passed a bool", () => {
    expect(isBool(true)).toBe(true);
    expect(isBool(false)).toBe(true);
  });

  test("isBool returns false when passed something else", () => {
    expect(isBool("some string")).toBe(false);
    expect(isFunction(2)).toBe(false);
    expect(isFunction(["1", 2])).toBe(false);
  });
});

describe("hasProperty tests", () => {
  test("hasProperty returns true when object has checked property", () => {
    const testProperty = "SOME_PROP";

    const testObject = {
      SOME_PROP: "something",
    };

    expect(hasProperty(testObject, testProperty)).toBe(true);
  });

  test("hasProperty returns false when object doesn't have checked property", () => {
    const testProperty = "SOME_PROP";

    const testObject = {
      PROP: "something",
    };

    expect(hasProperty(testObject, testProperty)).toBe(false);
  });
});

describe("hasValue tests", () => {
  test("hasValue returns true when object has checked value", () => {
    const testValue = "some value";
    const anotherTestValue = 2;

    const testObject = {
      PROP: testValue,
      ANOTHER_PROP: anotherTestValue,
    };

    expect(hasValue(testObject, testValue)).toBe(true);
    expect(hasValue(testObject, anotherTestValue)).toBe(true);
  });

  test("hasValue returns false when object doesn't have checked value", () => {
    const testValue = "some value";
    const anotherTestValue = 2;

    const testObject = {
      PROP: "different value",
      ANOTHER_PROP: 15,
    };

    expect(hasValue(testObject, testValue)).toBe(false);
    expect(hasValue(testObject, anotherTestValue)).toBe(false);
  });
});
