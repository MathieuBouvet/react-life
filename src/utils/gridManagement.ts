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
  cell: CellPosition
): number {
  const adjacentIndex: CellPosition[] = getNeighborsIndexes(cell);
  return adjacentIndex.reduce((livingNumber, item) => {
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
  console.time("generation");
  for (const line of range(gridHeight)) {
    for (const column of range(gridWidth)) {
      const currentCell: CellPosition = [line, column];
      const livingNumber = getLivingNeighborsNumber(liveCells, currentCell);
      if (
        livingNumber === 3 ||
        (liveCells.has(positionToStr(currentCell)) && livingNumber === 2)
      ) {
        newLiveCells.set(positionToStr(currentCell), true);
      }
    }
  }
  console.timeEnd("generation");
  return newLiveCells;
}

export { nextIteration };
