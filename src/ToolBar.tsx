import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import { StartButton, PauseButton } from "./Buttons";

const StyledToolBar = styled.aside`
  grid-area: toolbar;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 25px;
`;

type ToolBarProps = Pick<LifeState, "started"> & {
  dispatch: React.Dispatch<LifeAction>;
};

const ToolBar = ({ started, dispatch }: ToolBarProps) => (
  <StyledToolBar>
    {started ? (
      <PauseButton dispatch={dispatch} />
    ) : (
      <StartButton dispatch={dispatch} />
    )}
  </StyledToolBar>
);

export default ToolBar;
