import getButtonDisabilities from "./getButtonDisabilities";

type ButtonDisabilities = ReturnType<typeof getButtonDisabilities>;
type ButtonDisabilitiesParameters = Parameters<typeof getButtonDisabilities>;

test.each<[string, ButtonDisabilitiesParameters, ButtonDisabilities]>([
  [
    "simulation started",
    [true, 0, 0, 0],
    {
      startDisabled: true,
      pauseDisabled: false,
      clearGridDisabled: true,
      nextGenDisabled: true,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation started and current edition is not empty",
    [true, 0, 0, 42],
    {
      startDisabled: true,
      pauseDisabled: false,
      clearGridDisabled: false,
      nextGenDisabled: true,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation started and we are at the end of edition stack",
    [true, 21, 22, 42],
    {
      startDisabled: true,
      pauseDisabled: false,
      clearGridDisabled: false,
      nextGenDisabled: true,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation started and we are not the end of edition stack",
    [true, 5, 22, 42],
    {
      startDisabled: true,
      pauseDisabled: false,
      clearGridDisabled: false,
      nextGenDisabled: true,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation not started",
    [false, 0, 0, 0],
    {
      startDisabled: false,
      pauseDisabled: true,
      clearGridDisabled: true,
      nextGenDisabled: true,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation not started and current edition is not empty",
    [false, 0, 0, 42],
    {
      startDisabled: false,
      pauseDisabled: true,
      clearGridDisabled: false,
      nextGenDisabled: false,
      redoDisabled: true,
      undoDisabled: true,
    },
  ],
  [
    "simulation not started and we are at the end of edition stack",
    [false, 15, 16, 42],
    {
      startDisabled: false,
      pauseDisabled: true,
      clearGridDisabled: false,
      nextGenDisabled: false,
      redoDisabled: true,
      undoDisabled: false,
    },
  ],
  [
    "simulation not started and we are not at the end of edition stack",
    [false, 11, 16, 42],
    {
      startDisabled: false,
      pauseDisabled: true,
      clearGridDisabled: false,
      nextGenDisabled: false,
      redoDisabled: false,
      undoDisabled: false,
    },
  ],
])("%s", (_, args, expected) => {
  expect(getButtonDisabilities(...args)).toEqual(expected);
});
