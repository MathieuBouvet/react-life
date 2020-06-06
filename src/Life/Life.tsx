import React, { useMemo } from "react";
import styled from "styled-components";
import { GRID_SIZE, LifeState, LifeAction } from "../lifeState";
import { CellMemo } from "./Cell";
import { positionFrom } from "../utils/cellPosition";
import range from "../utils/range";
import { Stage, Layer } from "react-konva/lib/ReactKonvaCore";

type LifeProps = LifeState & {
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
};

type GridProps = Pick<LifeProps, "gridMaxWidth" | "gridMaxHeight" | "cellSize">;

const StyledLife = styled.main`
  grid-area: life;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Grid = styled(Stage).attrs<GridProps>(props => ({
  width: props.gridMaxWidth,
  height: props.gridMaxHeight,
  scaleX: props.cellSize,
  scaleY: props.cellSize,
}))`
  cursor: pointer;
`;

const LifeDisplay = ({
  gridMaxWidth,
  gridMaxHeight,
  cellSize,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  const theGrid = useMemo(() => {
    const grid = (
      <Layer>
        {range(GRID_SIZE).map(line =>
          range(GRID_SIZE).map(column => (
            <CellMemo
              key={`t[${line};${column}]`}
              position={[line, column]}
              alive={false}
              dispatch={dispatch}
            />
          ))
        )}
      </Layer>
    );
    return grid;
  }, [dispatch]);
  return (
    <StyledLife ref={gridRef}>
      <Grid {...{ gridMaxWidth, gridMaxHeight, cellSize }}>
        {theGrid}
        <Layer>
          {Array.from(livingCells, ([key, _]) => {
            const [line, column] = positionFrom(key);
            return (
              <CellMemo
                key={`[${line};${column}]`}
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
