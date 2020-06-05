import { positionToStr } from "./utils/cellPosition";
import { nextIterationOptimized } from "./utils/gridManagement";

export type CellPosition = [number, number];

export interface LifeState {
  started: boolean;
  gridHeight: number;
  gridWidth: number;
  gridMaxWidth: number;
  gridMaxHeight: number;
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

interface ToggleCell {
  type: "TOGGLE_CELL";
  payload: { position: CellPosition };
}

interface SetGridSpace {
  type: "SET_GRID_SPACE";
  payload: { maxWidth: number; maxHeight: number };
}

interface ResizeGridWidth {
  type: "RESIZE_GRID_WIDTH";
  payload: {
    width: number;
  };
}

interface ResizeGridHeight {
  type: "RESIZE_GRID_HEIGHT";
  payload: {
    height: number;
  };
}

export type LifeAction =
  | Start
  | Stop
  | Iterate
  | ToggleCell
  | SetGridSpace
  | ResizeGridHeight
  | ResizeGridWidth;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  gridHeight: 25,
  gridWidth: 50,
  gridMaxHeight: -1,
  gridMaxWidth: -1,
  livingCells: new Map([]),
};

function updatedCells(
  cells: Map<string, true>,
  at: CellPosition,
  actionControlFunc: (key: string) => boolean
): Map<string, true> {
  const cellsCopy = new Map(cells);
  const positionKey = positionToStr(at);
  if (actionControlFunc(positionKey)) {
    cellsCopy.set(positionKey, true);
  } else {
    cellsCopy.delete(positionKey);
  }
  return cellsCopy;
}

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "TOGGLE_CELL":
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
        livingCells: nextIterationOptimized(prevState.livingCells),
      };
    case "START":
      return { ...prevState, started: true };
    case "STOP":
      return { ...prevState, started: false };
    case "SET_GRID_SPACE":
      return {
        ...prevState,
        gridMaxWidth: action.payload.maxWidth,
        gridMaxHeight: action.payload.maxHeight,
      };
    case "RESIZE_GRID_WIDTH":
      return { ...prevState, gridWidth: action.payload.width };
    case "RESIZE_GRID_HEIGHT":
      return { ...prevState, gridHeight: action.payload.height };
    default:
      return prevState;
  }
};

export { initialLife, lifeReducer };
