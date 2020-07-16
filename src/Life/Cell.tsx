import React from "react";
import { BASE_CELL_SIZE } from "../lifeState";
import { Rect } from "react-konva/lib/ReactKonvaCore";
import "konva/lib/shapes/Rect";
import { theme } from "../theme";
import { Pair } from "../utils/pairOperations";

type CellProps = {
  position: Pair<number>;
};

const Cell = ({ position }: CellProps) => {
  return (
    <Rect
      x={position[1] * (BASE_CELL_SIZE + 1)}
      y={position[0] * (BASE_CELL_SIZE + 1)}
      width={BASE_CELL_SIZE}
      height={BASE_CELL_SIZE}
      fill={theme.colors.primary}
    />
  );
};

const CellMemo = React.memo(Cell, (prev, next) => {
  return (
    prev.position[0] === next.position[0] &&
    prev.position[1] === next.position[1]
  );
});

export default Cell;
export { CellMemo };
