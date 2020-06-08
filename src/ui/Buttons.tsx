import React from "react";
import styled from "styled-components";
import { LifeAction } from "../lifeState";
import { FaPlayCircle, FaPauseCircle, FaSkullCrossbones } from "react-icons/fa";
import { theme } from "../theme";

type ButtonProps = {
  action: LifeAction;
  children: JSX.Element;
} & SpecializedButtonProps;

export type SpecializedButtonProps = {
  dispatch: React.Dispatch<LifeAction>;
};

const Button = styled.button.attrs<ButtonProps>(props => ({
  onClick: () => props.dispatch(props.action),
}))<ButtonProps>`
  display: block;
  border: none;
  background-color: inherit;
  padding: 0;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  cursor: pointer;
  text-align: center;
  appearance: none;
  outline: none;

  &:hover > * {
    transform: scale(1.075);
  }

  &:active > * {
    transform: scale(1.075) translateY(2px);
  }

  & > * {
    display: block;
    margin: auto;
  }
`;

const StartButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "START" }}>
    <>
      start
    </>
  </Button>
);

const PauseButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "STOP" }}>
    <>
      pause
    </>
  </Button>
);

const ClearButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "CLEAR_GRID" }}>
    <>
      tout effacer
    </>
  </Button>
);

export { StartButton, PauseButton, ClearButton };
