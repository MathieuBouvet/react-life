import React from "react";
import styled from "styled-components";
import { LifeAction, CellPosition } from "../lifeState";

type StyledProps = Pick<CellProps, "alive" | "fromTemplate" | "position">;

const StyledCell = styled.div.attrs<StyledProps>(props => ({
  style: {
    gridRow: `${props.position[0] + 1} / span 1`,
    gridColumn: `${props.position[1] + 1} / span 1`,
  },
}))<StyledProps>`
  background-color: ${({ alive, theme }) =>
    alive ? theme.colors.primary : theme.colors.primaryLight};
  cursor: pointer;
  position: relative;
  z-index: ${({ fromTemplate }) => (fromTemplate ? "0" : "10")};
  &:hover {
    background-color: ${({ alive, theme }) =>
      alive ? theme.colors.primary : theme.colors.highlight};
  }
`;

type CellProps = {
  alive: boolean;
  fromTemplate: boolean;
  position: CellPosition;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = ({
  alive,
  position,
  dispatch,
  fromTemplate = false,
}: CellProps) => (
  <StyledCell
    alive={alive}
    position={position}
    fromTemplate={fromTemplate}
    onClick={() => dispatch({ type: "CELL_CLICK", payload: { position } })}
  />
);

export default Cell;
