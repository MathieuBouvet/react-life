import React, { useReducer } from "react";
import { lifeReducer, initialLife } from "./lifeState";
import LifeDisplay from "./LifeDisplay";

const LifeContainer = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  return <LifeDisplay {...{ ...lifeState, dispatch: dispatchLife }} />;
};

export default LifeContainer;
