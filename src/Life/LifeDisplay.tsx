import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import Cell from "./Cell";
import range from "../utils/range";
import { positionToStr } from "../utils/cellPosition";

interface LifeProps extends LifeState {
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
}

const StyledLife = styled.main`
  grid-area: life;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div<
  Pick<LifeProps, "gridHeight" | "gridWidth" | "cellSize">
>`
  display: grid;
  grid-template: ${({ gridHeight, gridWidth, cellSize }) =>
    `repeat(${gridHeight}, ${cellSize}px) / repeat(${gridWidth}, ${cellSize}px)`};
  grid-gap: 1px;
`;

const CellMemo = React.memo(Cell, (prev, next) => {
  return (
    prev.position[0] === next.position[0] &&
    prev.position[1] === next.position[1] &&
    prev.alive === next.alive
  );
});

const LifeDisplay = ({
  gridHeight,
  gridWidth,
  cellSize,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  return (
    <StyledLife>
      <Grid ref={gridRef} {...{ gridHeight, gridWidth, cellSize }}>
        {range(gridHeight).map(line =>
          range(gridWidth).map(column => (
            <CellMemo
              key={line * gridWidth + column}
              position={[line, column]}
              alive={livingCells.has(positionToStr([line, column]))}
              dispatch={dispatch}
            />
          ))
        )}
      </Grid>
    </StyledLife>
  );
};

export default LifeDisplay;
