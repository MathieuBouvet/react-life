import React from "react";
import styled from "styled-components";
import { LifeAction, CellPosition } from "./lifeState";

const StyledCell = styled.div<Pick<CellProps, "alive">>`
  background-color: ${({ alive, theme }) =>
    alive ? theme.colors.primary : theme.colors.primaryLight};
  cursor: pointer;
  &:hover {
    background-color: ${({ alive, theme }) =>
      alive ? theme.colors.primary : theme.colors.highlight};
  }
`;

type CellProps = {
  alive: boolean;
  position: CellPosition;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = ({ alive, position, dispatch }: CellProps) => (
  <StyledCell
    alive={alive}
    onClick={() => dispatch({ type: "CELL_CLICK", payload: { position } })}
  />
);

export default Cell;
