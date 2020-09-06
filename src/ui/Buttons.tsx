import React, { useEffect, useRef } from "react";
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
import { FiHelpCircle } from "react-icons/fi";
import { IconType } from "react-icons";
import { CgPlayTrackNextO } from "react-icons/cg";
import { IoIosHelpCircle } from "react-icons/io";

type ButtonProps = {
  action: LifeAction;
  repeatableAction?: boolean;
  children: JSX.Element;
} & SpecializedButtonProps;

export type SpecializedButtonProps = {
  disabled?: boolean;
  dispatch: React.Dispatch<LifeAction>;
};

type StyledButtonProps = ButtonProps & {
  repeat: () => void;
  cancel: () => void;
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

const DisabledButton = styled(BaseButton).attrs<StyledButtonProps>({
  disabled: true,
})<StyledButtonProps>`
  cursor: not-allowed;
  color: ${props => props.theme.colors.grayedOut};
`;

const ActiveButton = styled(BaseButton).attrs<StyledButtonProps>(
  ({ repeatableAction = false, ...props }) => {
    if (!repeatableAction) {
      return { onClick: () => props.dispatch(props.action) };
    }
    return {
      onMouseDown: () => {
        props.dispatch(props.action);
        props.repeat();
      },
      onMouseUp: props.cancel,
      onMouseLeave: props.cancel,
    };
  }
)<StyledButtonProps>`
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
  const StatusedButton = props.disabled ? DisabledButton : ActiveButton;
  const timerRef: React.MutableRefObject<number | null> = useRef(null);
  useEffect(() => {
    if (timerRef.current !== null && props.disabled) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  });
  const repeatAction = () => {
    timerRef.current = setInterval(() => props.dispatch(props.action), 150);
  };
  const cancelAction = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  return (
    <StatusedButton {...props} repeat={repeatAction} cancel={cancelAction}>
      {props.children}
    </StatusedButton>
  );
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

type ShowInfoButtonProps = { active: boolean; clickHandler: () => any };

const StyledShowInfoButton = styled(BaseButton)`
  color: ${props => props.theme.colors.light};
  cursor: pointer;

  &:hover > * {
    transform: scale(1.075);
  }

  &:active > * {
    transform: scale(1.075) translateY(2px);
  }
`;

const ShowInfoButton = (props: ShowInfoButtonProps) => {
  const ShowInfoIcon = props.active ? IoIosHelpCircle : FiHelpCircle;
  return (
    <StyledShowInfoButton onClick={props.clickHandler}>
      <>
        <ShowInfoIcon size="3em" />
        Aide
      </>
    </StyledShowInfoButton>
  );
};

export {
  StartButton,
  PauseButton,
  ClearButton,
  ArrowButton,
  UndoButton,
  RedoButton,
  NextGenButton,
  ShowInfoButton,
};
