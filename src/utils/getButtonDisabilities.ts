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
    startDisabled: false,
    pauseDisabled: false,
    clearGridDisabled: false,
    undoDisabled: false,
    redoDisabled: false,
    nextGenDisabled: false,
  };
}
