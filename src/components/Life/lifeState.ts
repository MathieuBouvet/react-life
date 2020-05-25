import { positionToStr } from "../../utils/cellPosition";

export type CellPosition = [number, number];

export interface LifeState {
  started: boolean;
  gridHeight: number;
  gridWidth: number;
  liveCells: Map<string, true>;
}

interface Iterate {
  type: "ITERATE";
}

interface Start {
  type: "START";
}

interface CellClick {
  type: "CELL_CLICK";
  payload: { position: CellPosition };
}

export type LifeAction = Start | Iterate | CellClick;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  gridHeight: 15,
  gridWidth: 25,
  liveCells: new Map([]),
};

const lifeReducer: LifeReducer = (prevState, action) => {
  switch (action.type) {
    case "CELL_CLICK":
      const cellsCopy = new Map(prevState.liveCells);
      const positionKey = positionToStr(action.payload.position);
      if (cellsCopy.has(positionKey)) {
        cellsCopy.delete(positionKey);
      } else {
        cellsCopy.set(positionKey, true);
      }
      return { ...prevState, liveCells: cellsCopy };
    default:
      return prevState;
  }
};

export { initialLife, lifeReducer };
