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
import { CgPlayTrackNextO } from "react-icons/cg";

type ButtonProps = {
  action: LifeAction;
  repeatableAction?: boolean;
  children: JSX.Element;
} & SpecializedButtonProps;

export type SpecializedButtonProps = {
  disabled?: boolean;
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

const BaseButton = styled.button`
  display: block;
  border: none;
  background-color: inherit;
  padding: 0;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  text-align: center;
  appearance: none;
  outline: none;

  & > * {
    display: block;
    margin: auto;
  }
`;

const DisabledButton = styled(BaseButton).attrs<ButtonProps>({
  disabled: true,
})<ButtonProps>`
  cursor: not-allowed;
  color: ${props => props.theme.colors.grayedOut};
`;

const ActiveButton = styled(BaseButton).attrs<ButtonProps>(
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
  color: ${props => props.theme.colors.light};
  cursor: pointer;

  &:hover > * {
    transform: scale(1.075);
  }

  &:active > * {
    transform: scale(1.075) translateY(2px);
  }
`;

const Button = (props: ButtonProps) => {
  const StatusButton = props.disabled ? DisabledButton : ActiveButton;
  return <StatusButton {...props}>{props.children}</StatusButton>;
};

const StartButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "START" }}>
    <>
      <FaPlayCircle size="3em" />
      start
    </>
  </Button>
);

const PauseButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "STOP" }}>
    <>
      <FaPauseCircle size="3em" />
      pause
    </>
  </Button>
);

const ClearButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "CLEAR_GRID" }}>
    <>
      <FaSkullCrossbones size="3em" />
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
      <ArrowIcon size="3em" />
    </Button>
  );
};

const UndoButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "UNDO" }} repeatableAction={true}>
    <>
      <FaUndoAlt size="3em" />
      Annuler
    </>
  </Button>
);

const RedoButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "REDO" }} repeatableAction={true}>
    <>
      <FaRedoAlt size="3em" />
      Rétablir
    </>
  </Button>
);

const NextGenButton = (props: SpecializedButtonProps) => (
  <Button {...props} action={{ type: "NEXT_STEP" }} repeatableAction={true}>
    <>
      <CgPlayTrackNextO size="3em" />
      suivant
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
  NextGenButton,
};
