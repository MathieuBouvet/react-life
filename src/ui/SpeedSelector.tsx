import React from "react";
import styled from "styled-components";
import { LifeAction, SpeedKey } from "../lifeState";

type Speed = {
  key: SpeedKey;
  value: string;
};

type SpeedButtonProps = {
  active?: boolean;
  speedKey: SpeedKey;
  children: string;
  dispatch: React.Dispatch<LifeAction>;
};

type SpeedSelectorProps = {
  selected: SpeedKey;
  dispatch: React.Dispatch<LifeAction>;
};

const StyledSpeedButton = styled.button`
  display: block;
  border: none;
  background-color: inherit;
  color: ${props => props.theme.colors.light};
  padding: 5px;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  cursor: pointer;
  text-align: center;
  appearance: none;
  outline: none;
`;

const StyledSpeedSelector = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledActiveBorder = styled.div`
  border: 2px solid ${props => props.theme.colors.light};
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  top: 0;
  left: 0;
`;

const SpeedButton = ({
  active,
  speedKey,
  dispatch,
  children,
}: SpeedButtonProps) => (
  <div style={{ position: "relative" }}>
    <StyledSpeedButton
      onClick={() =>
        dispatch({
          type: "SET_SPEED",
          payload: {
            speed: speedKey,
          },
        })
      }
    >
      {children}
    </StyledSpeedButton>
    {active && <StyledActiveBorder />}
  </div>
);

const speeds: Speed[] = [
  {
    key: "FAST",
    value: "rapide",
  },
  {
    key: "NORMAL",
    value: "normal",
  },
  {
    key: "SLOW",
    value: "lente",
  },
];

const SpeedSelector = ({ selected, dispatch }: SpeedSelectorProps) => (
  <StyledSpeedSelector>
    {speeds.map(speed => (
      <SpeedButton
        key={speed.key}
        active={selected === speed.key}
        speedKey={speed.key}
        dispatch={dispatch}
      >
        {speed.value}
      </SpeedButton>
    ))}
  </StyledSpeedSelector>
);

export default SpeedSelector;