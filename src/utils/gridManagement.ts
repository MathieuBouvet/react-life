import { Pair } from "../utils/pairOperations";
import range from "./range";
import { positionToStr, positionFrom } from "./cellPosition";

function getNeighborsIndexes(cell: Pair<number>): Pair<number>[] {
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
  adjacentCells: Pair<number>[]
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
      const currentCell: Pair<number> = [line, column];
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

function nextIterationOptimized(
  livingCells: Map<string, true>
): Map<string, true> {
  const nextLiving = new Map<string, true>();
  const deadCellsNeighborsCount = new Map<string, number>();
  livingCells.forEach((_, livingCellKey) => {
    const adjacentIndexes = getNeighborsIndexes(positionFrom(livingCellKey));
    let livingAdjacentNumber = 0;
    for (const adjacentCellIndex of adjacentIndexes) {
      const adjacentCellKey = positionToStr(adjacentCellIndex);
      if (!livingCells.has(adjacentCellKey)) {
        const counted = deadCellsNeighborsCount.get(adjacentCellKey) ?? 0;
        deadCellsNeighborsCount.set(adjacentCellKey, counted + 1);
      } else {
        livingAdjacentNumber++;
      }
    }
    if (livingAdjacentNumber === 2 || livingAdjacentNumber === 3) {
      nextLiving.set(livingCellKey, true);
    }
  });
  deadCellsNeighborsCount.forEach((livingAdjacentNumber, cellKey) => {
    if (livingAdjacentNumber === 3) {
      nextLiving.set(cellKey, true);
    }
  });
  return nextLiving;
}

export { nextIteration, nextIterationOptimized };
