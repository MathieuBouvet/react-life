import React, { useReducer, useRef, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Life from "./Life";
import { theme, GlobalStyle } from "./theme";
import {
  lifeReducer,
  initialLife,
  MoveDirection,
  speedMappings,
} from "./lifeState";
import ToolBar from "./ToolBar";
import InfoPage from "./InfoPage";
import { ShowInfoButton } from "./ui/Buttons";

function getArrowDirection(key: string): MoveDirection {
  const mappings: { [key: string]: MoveDirection } = {
    ArrowUp: "UP",
    ArrowLeft: "LEFT",
    ArrowDown: "DOWN",
    ArrowRight: "RIGHT",
  };
  return mappings[key];
}

const StyledApp = styled.section`
  display: grid;
  grid-template-areas:
    "header header"
    "life toolbar";
  grid-template-columns: ${({ theme }) =>
    `calc(100vw - ${theme.toolBarWidth}) ${theme.toolBarWidth}`};
  grid-template-rows: ${({ theme }) =>
    `${theme.headerHeight} calc(100vh - ${theme.headerHeight})`};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  grid-area: header;
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0 -20px 20px 10px black;
  position: relative;
  z-index: 10;
`;

const ToolbarMemo = React.memo(ToolBar);

const App = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  const gridRef = useRef<HTMLDivElement>(null);
  const {
    scale,
    gridMaxWidth,
    gridMaxHeight,
    gridOffset,
    started,
    livingCells,
    speed,
    editionStack,
    editionStackPosition,
  } = lifeState;
  const [showInfoPage, setShowInfoPage] = useState(false);

  function setGridSpace() {
    if (gridRef.current != null) {
      dispatchLife({
        type: "SET_GRID_SPACE",
        payload: {
          maxWidth: gridRef.current.clientWidth,
          maxHeight: gridRef.current.clientHeight,
        },
      });
    }
  }
  useEffect(() => {
    const nextIterationTimer = setTimeout(() => {
      if (lifeState.started) {
        dispatchLife({ type: "ITERATE" });
      }
    }, speedMappings[speed]);
    return () => {
      clearTimeout(nextIterationTimer);
    };
  });
  useEffect(setGridSpace, []);
  useEffect(() => {
    window.addEventListener("resize", setGridSpace);
    return () => window.removeEventListener("resize", setGridSpace);
  });
  useEffect(() => {
    function handleArrowKeys(e: KeyboardEvent): void {
      const direction = getArrowDirection(e.code);
      if (direction) {
        dispatchLife({
          type: "MOVE_CELLS",
          payload: {
            direction,
          },
        });
      }
    }
    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  });
  const cellsToDisplay = started
    ? livingCells
    : editionStack[editionStackPosition];
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <Header>
          React Life{" "}
          <ShowInfoButton
            active={showInfoPage}
            clickHandler={() => setShowInfoPage(!showInfoPage)}
          />
        </Header>
        <Life
          {...{
            scale,
            started,
            gridMaxWidth,
            gridMaxHeight,
            gridOffset,
            gridRef,
            speed,
          }}
          livingCells={cellsToDisplay}
          dispatch={dispatchLife}
        />
        <ToolbarMemo
          {...{
            started,
            scale,
            speed,
            editionStackPosition,
            editionStackLength: editionStack.length,
            currentEditionSize: editionStack[editionStackPosition].size,
          }}
          dispatch={dispatchLife}
        />
        <InfoPage visible={showInfoPage} />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
