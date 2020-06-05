import React from "react";
import styled from "styled-components";
import { LifeAction, CellPosition } from "../lifeState";

type StyledProps = Pick<CellProps, "alive" | "size" | "position">;

const StyledCell = styled.rect.attrs<StyledProps>(props => ({
  width: props.size,
  height: props.size,
  y: props.position[0] * (props.size + 1),
  x: props.position[1] * (props.size + 1),
}))<StyledProps>`
  fill: ${({ alive, theme }) =>
    alive ? theme.colors.primary : theme.colors.primaryLight};
  cursor: pointer;
  &:hover {
    fill: ${({ alive, theme }) =>
      alive ? theme.colors.primary : theme.colors.highlight};
  }
`;

type CellProps = {
  alive: boolean;
  size: number;
  position: CellPosition;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = ({ alive, position, dispatch, size }: CellProps) => (
  <StyledCell
    alive={alive}
    position={position}
    size={size}
    onClick={() => dispatch({ type: "TOGGLE_CELL", payload: { position } })}
  />
);

export default Cell;
