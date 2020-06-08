import React from "react";
import styled from "styled-components";
import { LifeAction } from "./lifeState";
import { FiPlayCircle, FiPauseCircle, FiTrash2 } from "react-icons/fi";
import { theme } from "./theme";

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

  &:hover > :first-child {
    transform: scale(1.075);
  }

  &:active > :first-child {
    transform: scale(1.075) translateY(3px);
  }

  * {
    display: block;
    margin: auto;
  }
`;

const StartButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "START" }}>
    <>
      <FiPlayCircle size="3em" stroke={theme.colors.dark} />
      start
    </>
  </Button>
);

const PauseButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "STOP" }}>
    <>
      <FiPauseCircle size="3em" stroke={theme.colors.dark} />
      pause
    </>
  </Button>
);

const ClearButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "CLEAR_GRID" }}>
    <>
      <FiTrash2 size="3em" stroke={theme.colors.dark} />
      tout effacer
    </>
  </Button>
);

export { StartButton, PauseButton, ClearButton };
