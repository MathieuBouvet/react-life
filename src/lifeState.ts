import { positionToStr } from "./utils/cellPosition";
import { nextIterationOptimized } from "./utils/gridManagement";
import { Pair, addPair, substractPair } from "./utils/pairOperations";

const BASE_CELL_SIZE = 25;
const GRID_SIZE = 500;

export type MoveDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type SpeedKey = "FAST" | "NORMAL" | "SLOW";

type SpeedMap = {
  [key in SpeedKey]: number;
};

export const speedMappings: SpeedMap = {
  FAST: 20,
  NORMAL: 50,
  SLOW: 75,
};

type HandleCellAction = (
  prevState: LifeState,
  coordinates: Pair<number>,
  newStackEntry?: boolean,
  forcedCellStatus?: "alive" | "dead"
) => LifeState;

export interface LifeState {
  started: boolean;
  scale: number;
  gridMaxWidth: number;
  gridMaxHeight: number;
  livingCells: Map<string, true>;
  editionStack: Map<string, true>[];
  editionStackPosition: number;
  gridOffset: Pair<number>;
  speed: SpeedKey;
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
  payload: { coordinates: [number, number]; newMove: boolean };
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
  payload: { zoomLevel: number; origin?: number };
}

interface MoveCells {
  type: "MOVE_CELLS";
  payload: {
    direction: MoveDirection;
  };
}

interface SetSpeed {
  type: "SET_SPEED";
  payload: {
    speed: SpeedKey;
  };
}

interface Undo {
  type: "UNDO";
}

interface Redo {
  type: "REDO";
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
  | MoveCells
  | SetSpeed
  | Undo
  | Redo;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  scale: 1,
  gridMaxHeight: -1,
  gridMaxWidth: -1,
  livingCells: new Map(),
  editionStack: [new Map()],
  editionStackPosition: 0,
  gridOffset: [0, 0],
  speed: "NORMAL",
};

function updatedCells(
  cells: Map<string, true>,
  at: Pair<number>,
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
  [x, y]: Pair<number>,
  scaleRatio: number,
  [offsetX, offsetY]: Pair<number>
): Pair<number> {
  const cellSize = (BASE_CELL_SIZE + 1) * scaleRatio;
  const column = Math.floor((x - offsetX * cellSize) / cellSize);
  const line = Math.floor((y - offsetY * cellSize) / cellSize);
  return [line, column];
}

function getCellMovement(direction: MoveDirection): [number, number] {
  switch (direction) {
    case "UP":
      return [0, 1];
    case "DOWN":
      return [0, -1];
    case "RIGHT":
      return [-1, 0];
    case "LEFT":
      return [1, 0];
  }
}

const addToEditionStack: HandleCellAction = (
  prevState,
  coordinates,
  newStackEntry = true,
  forcedCellLife?
): LifeState => {
  const { editionStack, editionStackPosition } = prevState;
  const currentEdition = editionStack[editionStackPosition];
  const controlCellLife: (key: string) => boolean =
    forcedCellLife !== undefined
      ? () => forcedCellLife === "alive"
      : positionKey => !currentEdition.has(positionKey);
  const newLivingCellsWhenPaused = updatedCells(
    currentEdition,
    cellPositionFromPxCoordinates(
      coordinates,
      prevState.scale,
      prevState.gridOffset
    ),
    controlCellLife
  );
  const stackOffset = newStackEntry ? 1 : 0;
  const newEditionStack = [
    ...editionStack.slice(0, editionStackPosition + stackOffset),
    newLivingCellsWhenPaused,
  ];
  return {
    ...prevState,
    editionStack: newEditionStack,
    editionStackPosition: editionStackPosition + stackOffset,
  };
};

const addToLivingCellsDirectly: HandleCellAction = (
  prevState,
  coordinates,
  _?,
  forcedCellLife?
): LifeState => {
  const controlCellLife: (key: string) => boolean =
    forcedCellLife !== undefined
      ? () => forcedCellLife === "alive"
      : positionKey => !prevState.livingCells.has(positionKey);
  const newLivingCellsWhenStarted = updatedCells(
    prevState.livingCells,
    cellPositionFromPxCoordinates(
      coordinates,
      prevState.scale,
      prevState.gridOffset
    ),
    controlCellLife
  );
  return { ...prevState, livingCells: newLivingCellsWhenStarted };
};

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "TOGGLE_CELL": {
      const handleAction = prevState.started
        ? addToLivingCellsDirectly
        : addToEditionStack;
      return handleAction(prevState, action.payload.coordinates);
    }
    case "SET_ALIVE": {
      const handleAction = prevState.started
        ? addToLivingCellsDirectly
        : addToEditionStack;
      return handleAction(
        prevState,
        action.payload.coordinates,
        action.payload.newMove,
        "alive"
      );
    }
    case "ITERATE": {
      return {
        ...prevState,
        livingCells: nextIterationOptimized(prevState.livingCells),
      };
    }
    case "START": {
      const currentEdition =
        prevState.editionStack[prevState.editionStackPosition];
      return {
        ...prevState,
        started: true,
        livingCells: new Map(currentEdition),
        editionStack: prevState.editionStack.slice(
          0,
          prevState.editionStackPosition + 1
        ),
      };
    }
    case "STOP": {
      return {
        ...prevState,
        started: false,
        editionStack: [
          ...prevState.editionStack,
          new Map(prevState.livingCells),
        ],
        editionStackPosition: prevState.editionStackPosition + 1,
      };
    }
    case "SET_GRID_SPACE": {
      return {
        ...prevState,
        gridMaxWidth: action.payload.maxWidth,
        gridMaxHeight: action.payload.maxHeight,
      };
    }
    case "CLEAR_GRID": {
      if (prevState.editionStack[prevState.editionStackPosition].size === 0) {
        return prevState;
      }
      let newStack, newStackPosition;
      if (prevState.started) {
        newStack = [
          ...prevState.editionStack.slice(
            0,
            prevState.editionStackPosition + 1
          ),
          new Map(prevState.livingCells),
          new Map(),
        ];
        newStackPosition = prevState.editionStackPosition + 2;
      } else {
        newStack = [
          ...prevState.editionStack.slice(
            0,
            prevState.editionStackPosition + 1
          ),
          new Map(),
        ];
        newStackPosition = prevState.editionStackPosition + 1;
      }
      return {
        ...prevState,
        started: false,
        livingCells: new Map<string, true>(),
        editionStack: newStack,
        editionStackPosition: newStackPosition,
      };
    }
    case "SET_ZOOM_LEVEL": {
      let zoomLevel = action.payload.zoomLevel;
      if (zoomLevel <= 0) {
        zoomLevel = 1;
      }
      if (zoomLevel > 500) {
        zoomLevel = 500;
      }
      const previousCenter = cellPositionFromPxCoordinates(
        [prevState.gridMaxHeight / 2, prevState.gridMaxWidth / 2],
        prevState.scale,
        prevState.gridOffset
      );
      const nextCenter = cellPositionFromPxCoordinates(
        [prevState.gridMaxHeight / 2, prevState.gridMaxWidth / 2],
        zoomLevel / 100,
        prevState.gridOffset
      );
      return {
        ...prevState,
        scale: zoomLevel / 100,
        gridOffset: addPair(
          prevState.gridOffset,
          substractPair(nextCenter, previousCenter)
        ),
      };
    }
    case "MOVE_CELLS": {
      const movement = getCellMovement(action.payload.direction);
      return {
        ...prevState,
        gridOffset: addPair(prevState.gridOffset, movement),
      };
    }
    case "SET_SPEED": {
      return {
        ...prevState,
        speed: action.payload.speed,
      };
    }
    case "UNDO": {
      if (prevState.editionStackPosition === 0 || prevState.started) {
        return prevState;
      }
      return {
        ...prevState,
        editionStackPosition: prevState.editionStackPosition - 1,
      };
    }
    case "REDO": {
      const { editionStackPosition, editionStack } = prevState;
      if (
        editionStackPosition === editionStack.length - 1 ||
        prevState.started
      ) {
        return prevState;
      }
      return {
        ...prevState,
        editionStackPosition: editionStackPosition + 1,
      };
    }
    default: {
      return prevState;
    }
  }
};

export {
  initialLife,
  lifeReducer,
  BASE_CELL_SIZE,
  GRID_SIZE,
  cellPositionFromPxCoordinates,
};
