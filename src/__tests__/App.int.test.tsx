import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("App renders its title", () => {
  const { queryByText } = render(<App />);
  const appTitle = queryByText(/react life/i);
  expect(appTitle).toBeInTheDocument();
});
