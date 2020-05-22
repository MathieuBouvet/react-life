type Cell = [number, number];

export interface LifeState {
  started: boolean;
  gridHeight: number;
  gridWidth: number;
  liveCells: Map<Cell, true>;
}

interface Iterate {
  type: "ITERATE";
}

interface Start {
  type: "START";
}

type LifeAction = Start | Iterate;

type LifeReducer = (prevState: LifeState, action: LifeAction) => LifeState;

const initialLife: LifeState = {
  started: false,
  gridHeight: 15,
  gridWidth: 25,
  liveCells: new Map([]),
};

const lifeReducer: LifeReducer = (prevState, action) => prevState;

export { initialLife, lifeReducer };
