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

const StyledButton = styled.button`
  display: block;
  border: none;
  background-color: inherit;
  padding: 0;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: 1rem;
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

  & * {
    display: block;
    margin: auto;
  }
`;

const Button = ({ action, dispatch, children }: ButtonProps) => (
  <StyledButton onClick={() => dispatch(action)}>{children}</StyledButton>
);

const StartButton = ({ dispatch }: SpecializedButtonProps) => (
  <Button dispatch={dispatch} action={{ type: "START" }}>
    <>
      <FiPlayCircle size="3em" stroke={theme.colors.dark} />
      start
    </>
  </Button>
);

const PauseButton = ({ dispatch }: SpecializedButtonProps) => (
  <StyledButton onClick={() => dispatch({ type: "STOP" })}>
    <>
      <FiPauseCircle size="3em" stroke={theme.colors.dark} />
      pause
    </>
  </StyledButton>
);

const ClearButton = ({ dispatch }: SpecializedButtonProps) => (
  <StyledButton onClick={() => dispatch({ type: "CLEAR_GRID" })}>
    <>
      <FiTrash2 size="3em" stroke={theme.colors.dark} />
      tout effacer
    </>
  </StyledButton>
);

export { StartButton, PauseButton, ClearButton };
