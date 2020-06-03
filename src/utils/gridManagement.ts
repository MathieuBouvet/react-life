import { CellPosition } from "../lifeState";
import range from "./range";
import { positionToStr } from "./cellPosition";

function getNeighborsIndexes(cell: CellPosition): CellPosition[] {
  return [
    [cell[0] - 1, cell[1] - 1],
    [cell[0] - 1, cell[1]],
    [cell[0] - 1, cell[1] + 1],
    [cell[0], cell[1] - 1],
    [cell[0], cell[1] + 1],
    [cell[0] + 1, cell[1] - 1],
    [cell[0] + 1, cell[1]],
    [cell[0] + 1, cell[1] + 1],
  ];
}

function getLivingNeighborsNumber(
  living: Map<string, true>,
  adjacentCells: CellPosition[]
): number {
  return adjacentCells.reduce((livingNumber, item) => {
    const adjacentInGrid = living.get(positionToStr(item));
    if (adjacentInGrid) {
      livingNumber++;
    }
    return livingNumber;
  }, 0);
}

function nextIteration(
  liveCells: Map<string, true>,
  gridHeight: number,
  gridWidth: number
): Map<string, true> {
  const newLiveCells = new Map<string, true>();
  for (const line of range(gridHeight)) {
    for (const column of range(gridWidth)) {
      const currentCell: CellPosition = [line, column];
      const livingNumber = getLivingNeighborsNumber(
        liveCells,
        getNeighborsIndexes(currentCell)
      );
      if (
        livingNumber === 3 ||
        (liveCells.has(positionToStr(currentCell)) && livingNumber === 2)
      ) {
        newLiveCells.set(positionToStr(currentCell), true);
      }
    }
  }
  return newLiveCells;
}

export { nextIteration };
