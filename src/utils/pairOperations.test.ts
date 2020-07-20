import { addPair, substractPair, dividePair } from "./pairOperations";

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

  describe("Pair division", () => {
    test.each<[[number, number], [number, number] | number, [number, number]]>([
      [
        [5, 6],
        [1, 1],
        [5, 6],
      ],
      [
        [0, 0],
        [4, 5],
        [0, 0],
      ],
      [
        [51, 63],
        [102, 3],
        [0.5, 21],
      ],
      [[0, 0], 1, [0, 0]],
      [[5, -5], 5, [1, -1]],
      [[12, -24], 6, [2, -4]],
      [[42, 42], 0, [Infinity, Infinity]],
    ])("%j - %j = %j", (p1, p2, result) => {
      expect(dividePair(p1, p2)).toStrictEqual(result);
    });
  });
});