import React, { useMemo } from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "../lifeState";
import Cell from "./Cell";
import { positionFrom } from "../utils/cellPosition";
import range from "../utils/range";

interface LifeProps extends LifeState {
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
}

const StyledLife = styled.main`
  grid-area: life;
  display: flex;
  align-items: center;
  justify-content: center;
`;
type GridProps = Pick<LifeProps, "gridHeight" | "gridWidth" | "cellSize">;
const Grid = styled.svg.attrs<GridProps>(props => ({
  width: props.gridWidth * (props.cellSize + 1),
  height: props.gridHeight * (props.cellSize + 1),
}))``;

const CellMemo = React.memo(Cell, (prev, next) => {
  return (
    prev.position[0] === next.position[0] &&
    prev.position[1] === next.position[1] &&
    prev.alive === next.alive &&
    prev.size === next.size
  );
});

const LifeDisplay = ({
  gridHeight,
  gridWidth,
  cellSize,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  const theGrid = useMemo(() => {
    return range(gridHeight).map(line =>
      range(gridWidth).map(column => (
        <CellMemo
          key={`t[${line};${column}]`}
          size={cellSize}
          position={[line, column]}
          alive={false}
          dispatch={dispatch}
        />
      ))
    );
  }, [gridHeight, gridWidth, cellSize, dispatch]);

  return (
    <StyledLife ref={gridRef}>
      <Grid {...{ gridHeight, gridWidth, cellSize }}>
        <>
          {theGrid}{" "}
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
        </>
      </Grid>
    </StyledLife>
  );
};

export default LifeDisplay;
