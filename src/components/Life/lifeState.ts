type Cell = [number, number];

interface LifeState {
  started: boolean;
  gridHeight: number;
  gridWidth: number;
  liveCells: Cell[];
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
  gridHeight: 25,
  gridWidth: 25,
  liveCells: [],
};

const lifeReducer: LifeReducer = (prevState, action) => prevState;

export { initialLife, lifeReducer };
