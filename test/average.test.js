const { test, describe } = require("node:test");
const assert = require("node:assert");

const average = require("../utils/for_testing").average;

describe("average", () => {
  test("average of one value is the value itself", () => {
    assert.strictEqual(average([7]), 7);
  });

  test("average of many is calculated correctly", () => {
    assert.strictEqual(average([1, 2, 3]), 2);
  });

  test("average of empty array is zero", () => {
    assert.strictEqual(average([]), 0);
  });
});
