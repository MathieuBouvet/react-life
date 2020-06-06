import React from "react";
import styled from "styled-components";
import { LifeAction, CellPosition } from "../lifeState";
import { Rect } from "react-konva/lib/ReactKonvaCore";
import "konva/lib/shapes/Rect";
import { theme } from "../theme";

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

const Cell = ({ alive, position, dispatch, size }: CellProps) => {
  const setCellAlive = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    if (e.buttons === 1) {
      dispatch({ type: "SET_CELL_ALIVE", payload: { position } });
    }
  };
  return (
    <Rect
      // alive={alive}
      // position={position}
      // size={size}
      x={position[1] * (size + 1)}
      y={position[0] * (size + 1)}
      width={size}
      height={size}
      fill={alive ? theme.colors.primary : theme.colors.primaryLight}
      onClick={() => dispatch({ type: "TOGGLE_CELL", payload: { position } })}
      // onMouseEnter={setCellAlive}
      // onMouseLeave={setCellAlive}
    />
  );
};

export default Cell;
