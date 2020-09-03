type ButtonDisabilities = {
  startDisabled: boolean;
  pauseDisabled: boolean;
  clearGridDisabled: boolean;
  undoDisabled: boolean;
  redoDisabled: boolean;
  nextGenDisabled: boolean;
};

export default function getButtonDisabilities(
  simulationStarted: boolean,
  editionStackPosition: number,
  editionStackLength: number,
  currentEditionSize: number
): ButtonDisabilities {
  return {
    startDisabled: simulationStarted,
    pauseDisabled: !simulationStarted,
    clearGridDisabled: currentEditionSize === 0,
    undoDisabled: simulationStarted || editionStackPosition === 0,
    redoDisabled:
      simulationStarted || editionStackPosition >= editionStackLength - 1,
    nextGenDisabled: simulationStarted,
  };
}
