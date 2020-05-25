import { positionFrom, positionToStr } from "./cellPosition";

test.each<[[number, number], string]>([
  [[0, 0], "0;0"],
  [[-5, 5], "-5;5"],
  [[12, 56], "12;56"],
])("position to string conversion", (position, expected) => {
  expect(positionToStr(position)).toBe(expected);
});

test.each([
  ["0;0", [0, 0]],
  ["1;1", [1, 1]],
  ["-5;5", [-5, 5]],
])("string to position conversion", (str, expected) => {
  expect(positionFrom(str)).toEqual(expected);
});
