import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  headerHeight: "75px",
} as const;

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const App = () => (
  <div className="app">
    <ThemeProvider theme={theme}></ThemeProvider>
  </div>
);

export default App;
