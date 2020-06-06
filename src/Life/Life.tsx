import React, { useMemo } from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "../lifeState";
import { CellMemo } from "./Cell";
import { positionFrom } from "../utils/cellPosition";
import range from "../utils/range";
import { Stage, Layer } from "react-konva/lib/ReactKonvaCore";

type LifeProps = Pick<LifeState, "cellSize" | "livingCells" | "started"> & {
  gridHeight: number;
  gridWidth: number;
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
};

type GridProps = Pick<LifeProps, "gridHeight" | "gridWidth" | "cellSize">;

const StyledLife = styled.main`
  grid-area: life;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Grid = styled(Stage).attrs<GridProps>(props => ({
  width: props.gridWidth * (props.cellSize + 1),
  height: props.gridHeight * (props.cellSize + 1),
}))`
  cursor: pointer;
`;

const LifeDisplay = ({
  gridHeight,
  gridWidth,
  cellSize,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  const theGrid = useMemo(() => {
    console.time("grid");
    const grid = (
      <Layer>
        {range(gridHeight).map(line =>
          range(gridWidth).map(column => (
            <CellMemo
              key={`t[${line};${column}]`}
              size={cellSize}
              position={[line, column]}
              alive={false}
              dispatch={dispatch}
            />
          ))
        )}
      </Layer>
    );
    console.timeEnd("grid");
    return grid;
  }, [gridHeight, gridWidth, cellSize, dispatch]);
  return (
    <StyledLife ref={gridRef}>
      <Grid {...{ gridWidth, gridHeight, cellSize }}>
        {theGrid}
        <Layer>
          {Array.from(livingCells, ([key, _]) => {
            const [line, column] = positionFrom(key);
            return (
              <CellMemo
                key={`[${line};${column}]`}
                size={cellSize}
                position={[line, column]}
                alive={true}
                dispatch={dispatch}
              />
            );
          })}
        </Layer>
      </Grid>
    </StyledLife>
  );
};

export default LifeDisplay;
