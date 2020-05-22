import React from "react";
import styled from "styled-components";
import { LifeAction } from "./lifeState";

const StyledCell = styled.div<Pick<CellProps, "alive">>`
  background-color: ${({ alive, theme }) =>
    alive ? theme.colors.primary : theme.colors.primaryLight};
  &:hover {
    background-color: ${({ alive, theme }) =>
      alive ? theme.colors.primary : theme.colors.highlight};
  }
`;

type CellProps = {
  alive: boolean;
  position: string;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = ({ alive, position, dispatch }: CellProps) => (
  <StyledCell
    alive={alive}
    onClick={() => dispatch({ type: "CELL_CLICK", payload: { position } })}
  />
);

export default Cell;
