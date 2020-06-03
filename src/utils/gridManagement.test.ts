import { nextIteration, nextIterationOptimized } from "./gridManagement";

test.each<[string, [string, true][], [string, true][]]>([
  [
    "block",
    [
      ["1;1", true],
      ["1;2", true],
      ["2;1", true],
      ["2;2", true],
    ],
    [
      ["1;1", true],
      ["1;2", true],
      ["2;1", true],
      ["2;2", true],
    ],
  ],
  [
    "bee-hive",
    [
      ["2;1", true],
      ["1;2", true],
      ["3;2", true],
      ["1;3", true],
      ["3;3", true],
      ["2;4", true],
    ],
    [
      ["2;1", true],
      ["1;2", true],
      ["3;2", true],
      ["1;3", true],
      ["3;3", true],
      ["2;4", true],
    ],
  ],
  [
    "blinker",
    [
      ["2;1", true],
      ["2;2", true],
      ["2;3", true],
    ],
    [
      ["1;2", true],
      ["2;2", true],
      ["3;2", true],
    ],
  ],
  [
    "toad",
    [
      ["2;2", true],
      ["2;3", true],
      ["2;4", true],
      ["3;1", true],
      ["3;2", true],
      ["3;3", true],
    ],
    [
      ["2;1", true],
      ["3;1", true],
      ["4;2", true],
      ["1;3", true],
      ["2;4", true],
      ["3;4", true],
    ],
  ],
  [
    "beacon",
    [
      ["1;1", true],
      ["2;1", true],
      ["1;2", true],
      ["4;3", true],
      ["3;4", true],
      ["4;4", true],
    ],
    [
      ["1;1", true],
      ["2;1", true],
      ["1;2", true],
      ["2;2", true],
      ["3;3", true],
      ["4;3", true],
      ["3;4", true],
      ["4;4", true],
    ],
  ],
  ["nothing", [], []],
])("two iterations: %s", (_, previousData, nextData) => {
  const previous = new Map(previousData);
  const next = new Map(nextData);
  expect(nextIteration(previous, 6, 6)).toEqual(next);
  expect(nextIteration(next, 6, 6)).toEqual(previous);
});

test.each<[string, [string, true][], [string, true][]]>([
  [
    "optimized : block",
    [
      ["1;1", true],
      ["1;2", true],
      ["2;1", true],
      ["2;2", true],
    ],
    [
      ["1;1", true],
      ["1;2", true],
      ["2;1", true],
      ["2;2", true],
    ],
  ],
  [
    "optimized : bee-hive",
    [
      ["2;1", true],
      ["1;2", true],
      ["3;2", true],
      ["1;3", true],
      ["3;3", true],
      ["2;4", true],
    ],
    [
      ["2;1", true],
      ["1;2", true],
      ["3;2", true],
      ["1;3", true],
      ["3;3", true],
      ["2;4", true],
    ],
  ],
  [
    "optimized : blinker",
    [
      ["2;1", true],
      ["2;2", true],
      ["2;3", true],
    ],
    [
      ["1;2", true],
      ["2;2", true],
      ["3;2", true],
    ],
  ],
  [
    "optimized : toad",
    [
      ["2;2", true],
      ["2;3", true],
      ["2;4", true],
      ["3;1", true],
      ["3;2", true],
      ["3;3", true],
    ],
    [
      ["2;1", true],
      ["3;1", true],
      ["4;2", true],
      ["1;3", true],
      ["2;4", true],
      ["3;4", true],
    ],
  ],
  [
    "optimized : beacon",
    [
      ["1;1", true],
      ["2;1", true],
      ["1;2", true],
      ["4;3", true],
      ["3;4", true],
      ["4;4", true],
    ],
    [
      ["1;1", true],
      ["2;1", true],
      ["1;2", true],
      ["2;2", true],
      ["3;3", true],
      ["4;3", true],
      ["3;4", true],
      ["4;4", true],
    ],
  ],
  ["optimized : nothing", [], []],
])("two iterations: %s", (_, previousData, nextData) => {
  const previous = new Map(previousData);
  const next = new Map(nextData);
  expect(nextIterationOptimized(previous)).toEqual(next);
  expect(nextIterationOptimized(next)).toEqual(previous);
});
