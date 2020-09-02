import { createGlobalStyle } from "styled-components";

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
    grayedOut: "gray",
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

export { theme, GlobalStyle };
