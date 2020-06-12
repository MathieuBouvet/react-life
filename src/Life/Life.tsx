import React, { useMemo } from "react";
import styled from "styled-components";
import { GRID_SIZE, BASE_CELL_SIZE, LifeState, LifeAction } from "../lifeState";
import { CellMemo } from "./Cell";
import { positionFrom } from "../utils/cellPosition";
import range from "../utils/range";
import { Stage, Layer } from "react-konva/lib/ReactKonvaCore";
import Loader from "../ui/Loader";
import { theme } from "../theme";
import { VerticalLine, HorizontalLine } from "./Line";

type LifeProps = LifeState & {
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
};

type GridProps = Pick<
  LifeProps,
  "gridMaxWidth" | "gridMaxHeight" | "scale" | "cellOffsetX" | "cellOffsetY"
>;

const StyledLife = styled.main`
  grid-area: life;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${props => props.theme.colors.primaryLight};
`;

const Grid = styled(Stage).attrs<GridProps>(props => ({
  width: props.$gridMaxWidth,
  height: props.$gridMaxHeight,
  scaleX: props.$scale,
  scaleY: props.$scale,
  x: props.$cellOffsetX * (BASE_CELL_SIZE + 1) * props.$scale,
  y: props.$cellOffsetY * (BASE_CELL_SIZE + 1) * props.$scale,
}))`
  cursor: pointer;
`;

const LifeDisplay = ({
  gridMaxWidth,
  gridMaxHeight,
  cellOffsetX,
  cellOffsetY,
  scale,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  const firstRender = gridMaxHeight === -1 || gridMaxWidth === -1;
  const theGrid = useMemo(() => {
    const grid = !firstRender ? (
      <Layer>
        {range(GRID_SIZE).map(line => (
          <React.Fragment key={`lines-${line}`}>
            <VerticalLine offset={(line + 1) * BASE_CELL_SIZE + line} />
            <HorizontalLine offset={(line + 1) * BASE_CELL_SIZE + line} />
          </React.Fragment>
        ))}
      </Layer>
    ) : null;
    return grid;
  }, [firstRender]);
  return (
    <StyledLife
      ref={gridRef}
      onWheel={e => {
        const step = e.deltaY > 0 ? -5 : 5;
        dispatch({
          type: "SET_ZOOM_LEVEL",
          payload: { zoomLevel: Math.round(scale * 100) + step },
        });
      }}
      onClick={e => {
        const offset = e.currentTarget.getClientRects()[0];
        dispatch({
          type: "TOGGLE_CELL",
          payload: {
            coordinates: [e.clientX - offset.left, e.clientY - offset.top],
          },
        });
      }}
    >
      {firstRender ? (
        <div>
          <Loader color={theme.colors.primary} />
          préparation de la grille
        </div>
      ) : (
        <Grid
          {...{
            $gridMaxWidth: gridMaxWidth,
            $gridMaxHeight: gridMaxHeight,
            $scale: scale,
            $cellOffsetX: cellOffsetX,
            $cellOffsetY: cellOffsetY,
          }}
        >
          {theGrid}
          <Layer>
            {Array.from(livingCells, ([key, _]) => {
              const [line, column] = positionFrom(key);
              return (
                <CellMemo
                  key={`[${line};${column}]`}
                  position={[line, column]}
                />
              );
            })}
          </Layer>
        </Grid>
      )}
    </StyledLife>
  );
};

export default LifeDisplay;
