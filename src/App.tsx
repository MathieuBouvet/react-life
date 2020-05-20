import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  headerHeight: "75px",
  colors: {
    primary: "#017927",
    light: "#fff",
    dark: "#2A2B2A",
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

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${({ theme }) => theme.headerHeight};
  color: ${({ theme }) => theme.colors.light};
  font-size: 3em;
  display: flex;
  align-items: center;
  padding-left: 15px;
  box-shadow: 0 -20px 20px 10px black;
`;

const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header>React Life</Header>
      </ThemeProvider>
    </div>
  );
};

export default App;
