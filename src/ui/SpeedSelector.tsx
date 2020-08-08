import React from "react";
import styled from "styled-components";

type SpeedButtonProps = {
  active?: boolean;
  children: string;
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

const SpeedSelector = () => (
  <StyledSpeedSelector>
    <SpeedButton>fast</SpeedButton>
    <SpeedButton active={true}>normal</SpeedButton>
    <SpeedButton>slow</SpeedButton>
  </StyledSpeedSelector>
);

export default SpeedSelector;
