import { positionToStr } from "./utils/cellPosition";
import { nextIterationOptimized } from "./utils/gridManagement";

const BASE_CELL_SIZE = 25;
const GRID_SIZE = 500;

export type CellPosition = [number, number];

export interface LifeState {
  started: boolean;
  scale: number;
  gridMaxWidth: number;
  gridMaxHeight: number;
  livingCells: Map<string, true>;
  cellOffsetX: number;
  cellOffsetY: number;
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
  payload: { coordinates: [number, number] };
}

interface SetAlive {
  type: "SET_ALIVE";
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

interface MoveCells {
  type: "MOVE_CELLS";
  payload: {
    direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  };
}

export type LifeAction =
  | Start
  | Stop
  | Iterate
  | ToggleCell
  | SetAlive
  | SetGridSpace
  | ClearGrid
  | SetZoomLevel
  | MoveCells;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  scale: 1,
  gridMaxHeight: -1,
  gridMaxWidth: -1,
  livingCells: new Map([]),
  cellOffsetX: 0,
  cellOffsetY: 0,
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
  scaleRatio: number,
  offsetX: number,
  offsetY: number
): CellPosition {
  const cellSize = (BASE_CELL_SIZE + 1) * scaleRatio;
  const column = Math.floor((x - offsetX * cellSize) / cellSize);
  const line = Math.floor((y - offsetY * cellSize) / cellSize);
  return [line, column];
}

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "TOGGLE_CELL":
      const aliveCellsFromToggle = updatedCells(
        prevState.livingCells,
        cellPositionFromPxCoordinates(
          action.payload.coordinates,
          prevState.scale,
          prevState.cellOffsetX,
          prevState.cellOffsetY
        ),
        positionKey => !prevState.livingCells.has(positionKey)
      );
      return { ...prevState, livingCells: aliveCellsFromToggle };
    case "SET_ALIVE":
      const setAliveCells = updatedCells(
        prevState.livingCells,
        cellPositionFromPxCoordinates(
          action.payload.coordinates,
          prevState.scale,
          prevState.cellOffsetX,
          prevState.cellOffsetY
        ),
        () => true
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
        scale: zoomLevel / 100,
      };
    default:
      return prevState;
  }
};

export { initialLife, lifeReducer, BASE_CELL_SIZE, GRID_SIZE };
