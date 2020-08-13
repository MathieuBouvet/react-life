import React from "react";
import styled from "styled-components";
import { LifeAction, MoveDirection as Direction } from "../lifeState";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaSkullCrossbones,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaUndoAlt,
  FaRedoAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { theme } from "../theme";

type ButtonProps = {
  action: LifeAction;
  repeatableAction?: boolean;
  children: JSX.Element;
} & SpecializedButtonProps;

export type SpecializedButtonProps = {
  dispatch: React.Dispatch<LifeAction>;
};

type ArrowButtonProps = SpecializedButtonProps & {
  direction: Direction;
};

function getArrowIcon(direction: Direction): IconType {
  switch (direction) {
    case "UP":
      return FaArrowAltCircleUp;
    case "DOWN":
      return FaArrowAltCircleDown;
    case "LEFT":
      return FaArrowAltCircleLeft;
    case "RIGHT":
      return FaArrowAltCircleRight;
  }
}

const Button = styled.button.attrs<ButtonProps>(
  ({ repeatableAction = false, ...props }) => {
    if (!repeatableAction) {
      return { onClick: () => props.dispatch(props.action) };
    }
    let repeat: number;
    return {
      onMouseDown: () => {
        props.dispatch(props.action);
        repeat = setInterval(() => props.dispatch(props.action), 100);
      },
      onMouseUp: () => clearInterval(repeat),
      onMouseLeave: () => clearInterval(repeat),
    };
  }
)<ButtonProps>`
  display: block;
  border: none;
  background-color: inherit;
  color: ${props => props.theme.colors.light};
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
      <FaPlayCircle size="3em" fill={theme.colors.light} />
      start
    </>
  </Button>
);

const PauseButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "STOP" }}>
    <>
      <FaPauseCircle size="3em" fill={theme.colors.light} />
      pause
    </>
  </Button>
);

const ClearButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "CLEAR_GRID" }}>
    <>
      <FaSkullCrossbones size="3em" fill={theme.colors.light} />
      tout effacer
    </>
  </Button>
);

const ArrowButton = ({ direction, ...props }: ArrowButtonProps) => {
  const ArrowIcon = getArrowIcon(direction);
  return (
    <Button
      {...props}
      action={{ type: "MOVE_CELLS", payload: { direction } }}
      repeatableAction={true}
    >
      <ArrowIcon size="3em" fill={theme.colors.light} />
    </Button>
  );
};

const UndoButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "UNDO" }}>
    <>
      <FaUndoAlt size="3em" fill={theme.colors.light} />
      Annuler
    </>
  </Button>
);

const RedoButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "REDO" }}>
    <>
      <FaRedoAlt size="3em" fill={theme.colors.light} />
      Rétablir
    </>
  </Button>
);

export {
  StartButton,
  PauseButton,
  ClearButton,
  ArrowButton,
  UndoButton,
  RedoButton,
};
