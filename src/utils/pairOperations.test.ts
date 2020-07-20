import { addPair, substractPair } from "./pairOperations";

describe("Pair addition", () => {
  test.each<[[number, number], [number, number] | number, [number, number]]>([
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [4, 5],
      [4, 5],
    ],
    [
      [78, 42],
      [102, 56],
      [180, 98],
    ],
    [
      [-5, -25],
      [10, -30],
      [5, -55],
    ],
    [[0, 0], 0, [0, 0]],
    [[0, 0], 5, [5, 5]],
    [[78, 42], 102, [180, 144]],
    [[-5, -25], -20, [-25, -45]],
  ])("%j + %j = %j", (p1, p2, result) => {
    expect(addPair(p1, p2)).toStrictEqual(result);
  });
});

describe("Pair Substraction", () => {
  test.each<[[number, number], [number, number] | number, [number, number]]>([
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [4, 5],
      [-4, -5],
    ],
    [
      [78, 42],
      [102, 56],
      [-24, -14],
    ],
    [
      [-5, -25],
      [10, -30],
      [-15, 5],
    ],
    [[0, 0], 0, [0, 0]],
    [[0, 0], 5, [-5, -5]],
    [[78, 42], 102, [-24, -60]],
    [[-5, -25], -30, [25, 5]],
  ])("%j - %j = %j", (p1, p2, result) => {
    expect(substractPair(p1, p2)).toStrictEqual(result);
  });
});
