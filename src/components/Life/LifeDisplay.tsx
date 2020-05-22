import React from "react";
import styled from "styled-components";
import { LifeState } from "./lifeState";
import range from "../../utils/range";

type LifeProps = LifeState;

const StyledLife = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
`;
const Cell = styled.div`
  background-color: red;
`;

const Grid = styled.div<Pick<LifeProps, "gridHeight" | "gridWidth">>`
  display: grid;
  grid-template: ${({ gridHeight, gridWidth }) =>
    `repeat(${gridHeight}, 25px) / repeat(${gridWidth}, 25px)`};
  grid-gap: 2px;
`;

const LifeDisplay = ({ gridHeight, gridWidth, liveCells }: LifeProps) => (
  <StyledLife>
    <Grid {...{ gridHeight, gridWidth }}>
      {range(gridHeight).map(line =>
        range(gridWidth).map(column => (
          <Cell
            key={line * gridHeight + column}
            x-line={line}
            x-column={column}
          ></Cell>
        ))
      )}
    </Grid>
  </StyledLife>
);

export default LifeDisplay;
