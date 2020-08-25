import React, { useMemo, useCallback, useRef } from "react";
import styled from "styled-components";
import {
  GRID_SIZE,
  BASE_CELL_SIZE,
  LifeState,
  LifeAction,
  cellPositionFromPxCoordinates,
} from "../lifeState";
import { CellMemo } from "./Cell";
import { positionFrom } from "../utils/cellPosition";
import { Pair, arePairsDifferent } from "../utils/pairOperations";
import range from "../utils/range";
import { Stage, Layer } from "react-konva/lib/ReactKonvaCore";
import Loader from "../ui/Loader";
import { theme } from "../theme";
import { VerticalLine, HorizontalLine } from "./Line";
import { throttle } from "lodash";

type LifeProps = Pick<
  LifeState,
  "gridMaxWidth" | "gridMaxHeight" | "gridOffset" | "scale" | "livingCells"
> & {
  dispatch: React.Dispatch<LifeAction>;
  gridRef: React.Ref<HTMLDivElement>;
};

type GridProps = Pick<
  LifeProps,
  "gridMaxWidth" | "gridMaxHeight" | "scale" | "gridOffset"
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
}))`
  cursor: pointer;
`;

const LifeDisplay = ({
  gridMaxWidth,
  gridMaxHeight,
  gridOffset,
  scale,
  livingCells,
  dispatch,
  gridRef,
}: LifeProps) => {
  const possiblyClickedCell = useRef<Pair<number> | null>(null);
  const handleMouseMoveThrottled = useCallback(
    throttle(
      (
        buttons: number,
        clientRects: DOMRectList,
        clientX: number,
        clientY: number
      ): void => {
        if (buttons === 1) {
          const offset = clientRects[0];
          const coordinates: Pair<number> = [
            clientX - offset.left,
            clientY - offset.top,
          ];
          const movedOnCell = cellPositionFromPxCoordinates(
            coordinates,
            scale,
            gridOffset
          );
          if (
            possiblyClickedCell.current !== null &&
            arePairsDifferent(possiblyClickedCell.current, movedOnCell)
          ) {
            dispatch({
              type: "SET_ALIVE",
              payload: {
                coordinates,
                newMove: false,
              },
            });
          }
        }
      },
      10
    ),
    [dispatch, scale, gridOffset]
  );
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
      handleMouseMoveThrottled(
        e.buttons,
        e.currentTarget.getClientRects(),
        e.clientX,
        e.clientY
      );
    },
    [handleMouseMoveThrottled]
  );

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
      onMouseDown={e => {
        const offset = e.currentTarget.getClientRects()[0];
        possiblyClickedCell.current = cellPositionFromPxCoordinates(
          [e.clientX - offset.left, e.clientY - offset.top],
          scale,
          gridOffset
        );
        dispatch({
          type: "TOGGLE_CELL",
          payload: {
            coordinates: [e.clientX - offset.left, e.clientY - offset.top],
          },
        });
      }}
      onMouseUp={() => {
        possiblyClickedCell.current = null;
      }}
      onMouseMove={handleMouseMove}
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
            $gridOffset: gridOffset,
          }}
        >
          {scale > 0.15 && theGrid}
          <Layer
            x={gridOffset[0] * (BASE_CELL_SIZE + 1)}
            y={gridOffset[1] * (BASE_CELL_SIZE + 1)}
          >
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
