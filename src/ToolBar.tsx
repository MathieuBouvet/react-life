import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import { StartButton } from "./Buttons";

const StyledToolBar = styled.aside`
  grid-area: toolbar;
  display: flex;
  flex-flow: column nowrap;
`;

type ToolBarProps = LifeState & { dispatch: React.Dispatch<LifeAction> };

const ToolBar = ({ started, dispatch }: ToolBarProps) => (
  <StyledToolBar>
    <StartButton dispatch={dispatch} />
  </StyledToolBar>
);

export default ToolBar;
