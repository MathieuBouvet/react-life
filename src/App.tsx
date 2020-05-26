import React, { useReducer, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Life from "./Life";
import { theme, GlobalStyle } from "./theme";
import { lifeReducer, initialLife } from "./lifeState";

const StyledApp = styled.section`
  display: grid;
  grid-template-areas:
    "header header"
    "life tool-bar";
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

const App = () => {
  const [lifeState, dispatchLife] = useReducer(lifeReducer, initialLife);
  const gridRef = useRef<HTMLDivElement>(null);
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
  const { gridHeight, gridWidth } = lifeState;
  useEffect(() => {
    if (gridRef.current != null) {
      const widthSize =
        (gridRef.current.clientWidth - gridWidth - 1) / gridWidth;
      const heightSize =
        (gridRef.current.clientHeight - gridHeight - 1) / gridHeight;
      const size = Math.min(widthSize, heightSize);
      dispatchLife({ type: "CELL_RESIZE", payload: { size } });
    }
  }, [gridHeight, gridWidth]);
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <Header>React Life</Header>
        <Life gridRef={gridRef} dispatch={dispatchLife} {...{ ...lifeState }} />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
