import React from "react";
import { LifeAction, CellPosition } from "../lifeState";
import { Rect } from "react-konva/lib/ReactKonvaCore";
import "konva/lib/shapes/Rect";
import { theme } from "../theme";

type CellProps = {
  alive: boolean;
  size: number;
  position: CellPosition;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = ({ alive, position, dispatch, size }: CellProps) => {
  return (
    <Rect
      x={position[1] * (size + 1)}
      y={position[0] * (size + 1)}
      width={size}
      height={size}
      fill={alive ? theme.colors.primary : theme.colors.primaryLight}
      onMouseDown={() =>
        dispatch({ type: "TOGGLE_CELL", payload: { position } })
      }
      onMouseEnter={e => {
        if (e.evt.buttons === 1) {
          dispatch({ type: "SET_CELL_ALIVE", payload: { position } });
        }
      }}
    />
  );
};

const CellMemo = React.memo(Cell, (prev, next) => {
  return (
    prev.position[0] === next.position[0] &&
    prev.position[1] === next.position[1] &&
    prev.alive === next.alive &&
    prev.size === next.size
  );
});

export default Cell;
export { CellMemo };
