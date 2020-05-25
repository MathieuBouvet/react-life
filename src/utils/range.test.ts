import range from "./range";

test.each<[string, [number, number], number[]]>([
  [
    "increasing range from -5 to 5 with default step",
    [-5, 5],
    [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4],
  ],
  [
    "decreasing range from 5 to -5 with default step",
    [5, -5],
    [5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
  ],
  ["equal start and destination", [5, 5], []],
])("%s", (_, args, expected) => {
  const [from, to] = args;
  expect([...range(from, to)]).toEqual(expected);
});

test.each<[string, number, number[]]>([
  ["positive range destination", 5, [0, 1, 2, 3, 4]],
  ["negative range destination", -5, [0, -1, -2, -3, -4]],
  ["range destination is zero", 0, []],
])("%s", (_, to, expected) => {
  expect([...range(to)]).toEqual(expected);
});

test.each<[string, [number, number, number], number[]]>([
  [
    "from -2 to 2 with 0.5 step",
    [-2, 2, 0.5],
    [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5],
  ],
  [
    "from 2 to -2 with 0.5 step",
    [2, -2, 0.5],
    [2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5],
  ],
])("%s", (_, args, expected) => {
  const [from, to, step] = args;
  expect([...range(from, to, step)]).toEqual(expected);
});

test.each([0, -1, -25])("throws on invalid step", step => {
  expect(() => [...range(0, 42, step)]).toThrow();
});
