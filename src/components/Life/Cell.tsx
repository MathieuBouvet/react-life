import React from "react";
import styled from "styled-components";
import { LifeAction } from "./lifeState";

const StyledCell = styled.div<CellProps>`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
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
