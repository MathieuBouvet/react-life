import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Life from "./Life";

const theme = {
  headerHeight: "75px",
  toolBarWidth: "240px",
  colors: {
    primary: "#017927",
    primaryLight: "#96e072",
    primaryDark: "#134611",
    light: "#fff",
    dark: "#2A2B2A",
    highlight: "#eec643",
  },
} as const;

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    color: ${props => props.theme.colors.dark};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

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
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <Header>React Life</Header>
        <Life />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
