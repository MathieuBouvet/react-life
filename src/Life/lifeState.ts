import { positionToStr } from "../utils/cellPosition";
import { nextIteration } from "../utils/gridManagement";

export type CellPosition = [number, number];

export interface LifeState {
  started: boolean;
  gridHeight: number;
  gridWidth: number;
  cellSize: number;
  livingCells: Map<string, true>;
}

interface Iterate {
  type: "ITERATE";
}

interface Start {
  type: "START";
}

interface Stop {
  type: "STOP";
}

interface CellClick {
  type: "CELL_CLICK";
  payload: { position: CellPosition };
}

interface CellResize {
  type: "CELL_RESIZE";
  payload: { size: number };
}

export type LifeAction = Start | Stop | Iterate | CellClick | CellResize;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  gridHeight: 25,
  gridWidth: 50,
  cellSize: 25,
  livingCells: new Map([]),
};

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "CELL_CLICK":
      const cellsCopy = new Map(prevState.livingCells);
      const positionKey = positionToStr(action.payload.position);
      if (cellsCopy.has(positionKey)) {
        cellsCopy.delete(positionKey);
      } else {
        cellsCopy.set(positionKey, true);
      }
      return { ...prevState, livingCells: cellsCopy };
    case "ITERATE":
      return {
        ...prevState,
        livingCells: nextIteration(
          prevState.livingCells,
          prevState.gridHeight,
          prevState.gridWidth
        ),
      };
    case "START":
      return { ...prevState, started: true };
    case "STOP":
      return { ...prevState, started: false };
    case "CELL_RESIZE":
      return { ...prevState, cellSize: action.payload.size };
    default:
      return prevState;
  }
};

export { initialLife, lifeReducer };
