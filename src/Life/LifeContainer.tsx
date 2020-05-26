import React, { useReducer, useEffect } from "react";
import { lifeReducer, initialLife } from "./lifeState";
import LifeDisplay from "./LifeDisplay";

const LifeContainer = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  useEffect(() => {
    const nextIterationTimer = setTimeout(() => {
      if (lifeState.started) {
        dispatchLife({ type: "ITERATE" });
      }
    }, 50);
    return () => {
      clearTimeout(nextIterationTimer);
    };
  });
  return <LifeDisplay {...{ ...lifeState, dispatch: dispatchLife }} />;
};

export default LifeContainer;
