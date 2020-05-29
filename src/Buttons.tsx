import React from "react";
import styled from "styled-components";
import { LifeAction } from "./lifeState";
import { FiPlayCircle } from "react-icons/fi";

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
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover > :first-child {
    transform: scale(1.075);
  }

  & * {
    display: block;
  }
`;

const Button = ({ action, dispatch, children }: ButtonProps) => (
  <StyledButton onClick={() => dispatch(action)}>{children}</StyledButton>
);

const StartButton = ({ dispatch }: SpecializedButtonProps) => (
  <Button dispatch={dispatch} action={{ type: "START" }}>
    <>
      <FiPlayCircle size="4.5rem" />
      start
    </>
  </Button>
);

export { StartButton };
