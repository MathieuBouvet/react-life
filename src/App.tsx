import React from "react";
import { ThemeProvider } from "styled-components";

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

const App = () => (
  <div className="app">
    <ThemeProvider theme={theme}></ThemeProvider>
  </div>
);

export default App;
