import React from "react";
import { Rect } from "react-konva/lib/ReactKonvaCore";
import "konva/lib/shapes/Rect";
import { GRID_SIZE, BASE_CELL_SIZE } from "../lifeState";
import { theme } from "../theme";

type LineProps = {
  offset: number;
};

const VerticalLine = ({ offset }: LineProps) => (
  <Rect
    x={offset}
    y={0}
    width={1}
    height={GRID_SIZE * (BASE_CELL_SIZE + 1)}
    fill={theme.colors.light}
  />
);

const HorizontalLine = ({ offset }: LineProps) => (
  <Rect
    x={0}
    y={offset}
    width={GRID_SIZE * (BASE_CELL_SIZE + 1)}
    height={1}
    fill={theme.colors.light}
  />
);

export { VerticalLine, HorizontalLine };
