import React from "react";
import styled from "styled-components";
import { useFlip, FlipProvider } from "react-easy-flip";

type SelectorButtonProps<T> = {
  active?: boolean;
  action: T;
  dispatch: React.Dispatch<T>;
  flipId: string;
  children: string;
};

type SelectorButtonsData<T> = {
  value: string;
  action: T;
  displayText: string;
};

type SelectorProps<T> = {
  selected: string;
  flipRootId: string;
  children: SelectorButtonsData<T>[];
  dispatch: React.Dispatch<T>;
};

const StyledButton = styled.button`
  display: block;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
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
  width: 55px;
`;

const StyledSelector = styled.div`
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

function SelectorButton<T>({
  active,
  action,
  dispatch,
  flipId,
  children,
}: SelectorButtonProps<T>) {
  return (
    <div style={{ position: "relative", margin: "5px" }}>
      <StyledButton onClick={() => dispatch(action)}>{children}</StyledButton>
      {active && <StyledActiveBorder data-flip-id={flipId} />}
    </div>
  );
}

function SelectorWithoutFlipProvider<T>({
  selected,
  flipRootId,
  dispatch,
  children,
}: SelectorProps<T>) {
  useFlip(flipRootId);
  return (
    <StyledSelector data-flip-root-id={flipRootId}>
      {children.map((button, index) => (
        <SelectorButton
          key={flipRootId + "-" + index}
          flipId={flipRootId + "-border"}
          action={button.action}
          dispatch={dispatch}
          active={selected === button.value}
        >
          {button.displayText}
        </SelectorButton>
      ))}
    </StyledSelector>
  );
}

function withFlipProvider<T>(Component: (props: T) => JSX.Element) {
  return function withFlipProvider(props: T) {
    return (
      <FlipProvider>
        <Component {...props} />
      </FlipProvider>
    );
  };
}

const Selector = withFlipProvider(SelectorWithoutFlipProvider);

export { Selector, SelectorButton };
