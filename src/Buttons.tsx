import React from "react";
import { LifeAction } from "./lifeState";
import { FiPlayCircle } from "react-icons/fi";

type ButtonProps = {
  action: LifeAction;
  children: JSX.Element;
} & SpecializedButtonProps;

export type SpecializedButtonProps = {
  dispatch: React.Dispatch<LifeAction>;
};

const Button = ({ action, dispatch, children }: ButtonProps) => (
  <button onClick={() => dispatch(action)}>{children}</button>
);

const StartButton = ({ dispatch }: SpecializedButtonProps) => (
  <Button dispatch={dispatch} action={{ type: "START" }}>
    <FiPlayCircle />
  </Button>
);

export { StartButton };
