import React, { useReducer, useEffect, useRef } from "react";
import { lifeReducer, initialLife } from "./lifeState";
import LifeDisplay from "./LifeDisplay";

const LifeContainer = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  const gridRef = useRef<HTMLDivElement>(null);
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
  const { gridHeight, gridWidth } = lifeState;
  useEffect(() => {
    if (gridRef.current != null) {
      const widthSize =
        (gridRef.current.clientWidth - gridWidth - 1) / gridWidth;
      const heightSize =
        (gridRef.current.clientHeight - gridHeight - 1) / gridHeight;
      const size = Math.min(widthSize, heightSize);
      dispatchLife({ type: "CELL_RESIZE", payload: { size } });
    }
  }, [gridHeight, gridWidth]);
  return (
    <LifeDisplay
      gridRef={gridRef}
      dispatch={dispatchLife}
      {...{ ...lifeState }}
    />
  );
};

export default LifeContainer;
