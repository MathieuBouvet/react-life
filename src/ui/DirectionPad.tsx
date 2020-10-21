import React from "react";
import styled from "styled-components";
import { LifeAction } from "../lifeState";
import { ArrowButton } from "./Buttons";

type DirectionPadProps = {
  dispatch: React.Dispatch<LifeAction>;
};

const StyledDirectionPad = styled.div<DirectionPadProps>`
  display: grid;
  width: 75%;
  grid-template-areas:
    "UP UP"
    "LEFT RIGHT"
    "DOWN DOWN";
`;

const Arrow = styled(ArrowButton)`
  grid-area: ${props => props.direction};
`;

const DirectionPad = ({ dispatch }: DirectionPadProps) => (
  <StyledDirectionPad dispatch={dispatch}>
    <Arrow direction="UP" dispatch={dispatch} />
    <Arrow direction="LEFT" dispatch={dispatch} />
    <Arrow direction="RIGHT" dispatch={dispatch} />
    <Arrow direction="DOWN" dispatch={dispatch} />
  </StyledDirectionPad>
);

export default DirectionPad;
