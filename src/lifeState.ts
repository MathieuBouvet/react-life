import { positionToStr } from "./utils/cellPosition";
import { nextIterationOptimized } from "./utils/gridManagement";

const BASE_CELL_SIZE = 25;
const GRID_SIZE = 300;

export type CellPosition = [number, number];

export interface LifeState {
  started: boolean;
  cellSize: number;
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

interface SetCellAlive {
  type: "SET_CELL_ALIVE";
  payload: { coordinates: [number, number] };
}

interface SetGridSpace {
  type: "SET_GRID_SPACE";
  payload: { maxWidth: number; maxHeight: number };
}

interface ClearGrid {
  type: "CLEAR_GRID";
}

interface SetZoomLevel {
  type: "SET_ZOOM_LEVEL";
  payload: { zoomLevel: number };
}

export type LifeAction =
  | Start
  | Stop
  | Iterate
  | ToggleCell
  | SetCellAlive
  | SetGridSpace
  | ClearGrid
  | SetZoomLevel;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  cellSize: 1,
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

function cellPositionFromPxCoordinates(
  [x, y]: [number, number],
  scaleRatio: number
): CellPosition {
  const column = Math.floor(x / ((BASE_CELL_SIZE + 1) * scaleRatio));
  const line = Math.floor(y / ((BASE_CELL_SIZE + 1) * scaleRatio));
  return [line, column];
}

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "TOGGLE_CELL":
      const toggledLivingCells = updatedCells(
        prevState.livingCells,
        action.payload.position,
        positionKey => !prevState.livingCells.has(positionKey)
      );
      return { ...prevState, livingCells: toggledLivingCells };
    case "SET_CELL_ALIVE":
      const setAliveCells = updatedCells(
        prevState.livingCells,
        cellPositionFromPxCoordinates(
          action.payload.coordinates,
          prevState.cellSize
        ),
        positionKey => !prevState.livingCells.has(positionKey)
      );
      return { ...prevState, livingCells: setAliveCells };
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
    case "CLEAR_GRID":
      return {
        ...prevState,
        started: false,
        livingCells: new Map<string, true>(),
      };
    case "SET_ZOOM_LEVEL":
      let zoomLevel = action.payload.zoomLevel;
      if (zoomLevel < 0) {
        zoomLevel = 5;
      }
      if (zoomLevel > 500) {
        zoomLevel = 500;
      }
      return {
        ...prevState,
        cellSize: zoomLevel / 100,
      };
    default:
      return prevState;
  }
};

export { initialLife, lifeReducer, BASE_CELL_SIZE, GRID_SIZE };
