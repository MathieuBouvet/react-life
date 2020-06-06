import React, { useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Life from "./Life";
import { theme, GlobalStyle } from "./theme";
import { lifeReducer, initialLife } from "./lifeState";
import ToolBar from "./ToolBar";

function getCellSize(
  gridMaxWidth: number,
  gridMaxHeight: number,
  lineNumber: number,
  columnNumber: number
): number {
  if (gridMaxHeight < 0 && gridMaxWidth < 0) {
    return 20;
  }
  const fitWidth = (gridMaxWidth - lineNumber) / lineNumber;
  const fitHeight = (gridMaxHeight - columnNumber) / columnNumber;
  return Math.min(fitWidth, fitHeight);
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
  padding-left: 15px;
  box-shadow: 0 -20px 20px 10px black;
`;

const ToolbarMemo = React.memo(ToolBar);

const App = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  const gridRef = useRef<HTMLDivElement>(null);
  const {
    gridWidth,
    gridHeight,
    gridMaxWidth,
    gridMaxHeight,
    started,
  } = lifeState;
  const cellSize = getCellSize(
    gridMaxWidth,
    gridMaxHeight,
    gridWidth,
    gridHeight
  );
  useEffect(() => {
    const nextIterationTimer = setTimeout(() => {
      if (lifeState.started) {
        dispatchLife({ type: "ITERATE" });
      }
    }, 50);
    return () => {
      clearTimeout(nextIterationTimer);
    };
  });
  useEffect(() => {
    if (gridRef.current != null) {
      dispatchLife({
        type: "SET_GRID_SPACE",
        payload: {
          maxWidth: gridRef.current.clientWidth,
          maxHeight: gridRef.current.clientHeight,
        },
      });
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <Header>React Life</Header>
        <Life
          {...{ ...lifeState }}
          gridRef={gridRef}
          dispatch={dispatchLife}
          cellSize={cellSize}
        />
        <ToolbarMemo
          {...{ gridWidth, gridHeight, started }}
          dispatch={dispatchLife}
        />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
