import React from "react";
import styled from "styled-components";
import { LifeState, LifeAction } from "./lifeState";
import {
  StartButton,
  PauseButton,
  ClearButton,
  RedoButton,
  UndoButton,
  NextGenButton,
} from "./ui/Buttons";
import ZoomLevel from "./ui/ZoomLevel";
import DirectionPad from "./ui/DirectionPad";
import { Selector } from "./ui/Selector";

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
    <ButtonGroup>
      {started ? (
        <PauseButton dispatch={dispatch} />
      ) : (
        <StartButton dispatch={dispatch} />
      )}
      <NextGenButton dispatch={dispatch} />
    </ButtonGroup>
    <ClearButton dispatch={dispatch} />
    <ZoomLevel value={scale} dispatch={dispatch} />
    <Selector selected={speed} flipRootId="speed" dispatch={dispatch}>
      {[
        {
          value: "FAST",
          displayText: "rapide",
          action: { type: "SET_SPEED", payload: { speed: "FAST" } },
        },
        {
          value: "NORMAL",
          displayText: "normal",
          action: { type: "SET_SPEED", payload: { speed: "NORMAL" } },
        },
        {
          value: "SLOW",
          displayText: "lent",
          action: { type: "SET_SPEED", payload: { speed: "SLOW" } },
        },
      ]}
    </Selector>
    <ButtonGroup>
      <UndoButton dispatch={dispatch} />
      <RedoButton dispatch={dispatch} />
    </ButtonGroup>
    <DirectionPad dispatch={dispatch} />
  </StyledToolBar>
);

export default ToolBar;
