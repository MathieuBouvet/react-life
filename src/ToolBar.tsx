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
import getButtonDisabilities from "./utils/getButtonDisabilities";

const StyledToolBar = styled.aside`
  grid-area: toolbar;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.light};
  & > * {
    margin-top: 18px;
  }
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-top: auto;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

type ToolBarProps = Pick<LifeState, "started" | "scale" | "speed"> & {
  editionStackPosition: number;
  editionStackLength: number;
  currentEditionSize: number;
  dispatch: React.Dispatch<LifeAction>;
};

const ToolBar = ({
  started,
  scale,
  dispatch,
  speed,
  editionStackPosition,
  editionStackLength,
  currentEditionSize,
}: ToolBarProps) => {
  const {
    startDisabled,
    pauseDisabled,
    clearGridDisabled,
    nextGenDisabled,
    redoDisabled,
    undoDisabled,
  } = getButtonDisabilities(
    started,
    editionStackPosition,
    editionStackLength,
    currentEditionSize
  );
  return (
    <StyledToolBar>
      <ButtonGroup>
        {started ? (
          <PauseButton dispatch={dispatch} disabled={pauseDisabled} />
        ) : (
          <StartButton dispatch={dispatch} disabled={startDisabled} />
        )}
        <NextGenButton dispatch={dispatch} disabled={nextGenDisabled} />
      </ButtonGroup>
      <ClearButton dispatch={dispatch} disabled={clearGridDisabled} />
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
        <UndoButton dispatch={dispatch} disabled={undoDisabled} />
        <RedoButton dispatch={dispatch} disabled={redoDisabled} />
      </ButtonGroup>
      <DirectionPad dispatch={dispatch} />
    </StyledToolBar>
  );
};

export default ToolBar;
