import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import Cell from "./Cell";
import range from "../../utils/range";
import { positionToStr } from "../../utils/cellPosition";

interface LifeProps extends LifeState {
  dispatch: React.Dispatch<LifeAction>;
}

const StyledLife = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
`;

const Grid = styled.div<Pick<LifeProps, "gridHeight" | "gridWidth">>`
  display: grid;
  grid-template: ${({ gridHeight, gridWidth }) =>
    `repeat(${gridHeight}, 25px) / repeat(${gridWidth}, 25px)`};
  grid-gap: 2px;
`;

const LifeDisplay = ({
  gridHeight,
  gridWidth,
  livingCells,
  dispatch,
}: LifeProps) => (
  <StyledLife>
    <Grid {...{ gridHeight, gridWidth }}>
      {range(gridHeight).map(line =>
        range(gridWidth).map(column => (
          <Cell
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

export default LifeDisplay;
