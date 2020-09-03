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
])("%s", (_, args, expected) => {
  expect(getButtonDisabilities(...args)).toEqual(expected);
});
