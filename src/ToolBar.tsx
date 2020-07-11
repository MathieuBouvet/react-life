import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import { StartButton, PauseButton, ClearButton } from "./ui/Buttons";
import ZoomLevel from "./ui/ZoomLevel";
import DirectionPad from "./ui/DirectionPad";

const StyledToolBar = styled.aside`
  grid-area: toolbar;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.light};
`;

type ToolBarProps = Pick<LifeState, "started" | "scale"> & {
  dispatch: React.Dispatch<LifeAction>;
};

const ToolBar = ({ started, scale, dispatch }: ToolBarProps) => (
  <StyledToolBar>
    {started ? (
      <PauseButton dispatch={dispatch} />
    ) : (
      <StartButton dispatch={dispatch} />
    )}
    <ClearButton dispatch={dispatch} />
    <ZoomLevel value={scale} dispatch={dispatch} />
    <DirectionPad dispatch={dispatch} />
  </StyledToolBar>
);

export default ToolBar;
