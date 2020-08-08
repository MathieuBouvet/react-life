import React from "react";
import styled from "styled-components";
import { LifeAction, SpeedKey } from "../lifeState";

type Speed = {
  key: SpeedKey;
  value: string;
};

type SpeedButtonProps = {
  active?: boolean;
  children: string;
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

const SpeedButton = (props: SpeedButtonProps) => (
  <div style={{ position: "relative" }}>
    <StyledSpeedButton>{props.children}</StyledSpeedButton>
    {props.active && <StyledActiveBorder />}
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

const SpeedSelector = ({ selected }: SpeedSelectorProps) => (
  <StyledSpeedSelector>
    {speeds.map(speed => (
      <SpeedButton active={selected === speed.key}>{speed.value}</SpeedButton>
    ))}
  </StyledSpeedSelector>
);

export default SpeedSelector;
