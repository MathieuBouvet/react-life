import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import {
  StartButton,
  PauseButton,
  ClearButton,
  RedoButton,
  UndoButton,
} from "./ui/Buttons";
import ZoomLevel from "./ui/ZoomLevel";
import DirectionPad from "./ui/DirectionPad";
import SpeedSelector from "./ui/SpeedSelector";

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

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

type ToolBarProps = Pick<LifeState, "started" | "scale" | "speed"> & {
  dispatch: React.Dispatch<LifeAction>;
};

const ToolBar = ({ started, scale, dispatch, speed }: ToolBarProps) => (
  <StyledToolBar>
    {started ? (
      <PauseButton dispatch={dispatch} />
    ) : (
      <StartButton dispatch={dispatch} />
    )}
    <ClearButton dispatch={dispatch} />
    <ZoomLevel value={scale} dispatch={dispatch} />
    <SpeedSelector selected={speed} dispatch={dispatch} />
    <ButtonGroup>
      <>
        <UndoButton dispatch={dispatch} />
        <RedoButton dispatch={dispatch} />
      </>
    </ButtonGroup>
    <DirectionPad dispatch={dispatch} />
  </StyledToolBar>
);

export default ToolBar;
