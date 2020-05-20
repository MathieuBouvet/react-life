import React from "react";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  headerHeight: "75px",
  colors: {
    primary: "#017927",
    light: "#fff",
  },
} as const;

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

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
        <Header>React Life</Header>
      </ThemeProvider>
    </div>
  );
};

export default App;
