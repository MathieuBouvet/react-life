import React, { useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Life from "./Life";
import { theme, GlobalStyle } from "./theme";
import { lifeReducer, initialLife } from "./lifeState";
import ToolBar from "./ToolBar";

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
    gridOffsetX,
    gridOffsetY,
    started,
    livingCells,
  } = lifeState;
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
          {...{
            scale,
            started,
            gridMaxWidth,
            gridMaxHeight,
            gridOffsetX,
            gridOffsetY,
            gridRef,
            livingCells,
          }}
          dispatch={dispatchLife}
        />
        <ToolbarMemo {...{ started, scale }} dispatch={dispatchLife} />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
