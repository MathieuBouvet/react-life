import React from "react";
import styled from "styled-components";
import { LifeAction } from "../lifeState";
import { TiZoomOutline } from "react-icons/ti";
import { FaPercent } from "react-icons/fa";

type ZoomLevelProps = {
  value: number;
  dispatch: React.Dispatch<LifeAction>;
};
const ZoomLevelInput = styled.input.attrs<ZoomLevelProps>(props => ({
  type: "number",
  step: 5,
  value: Math.round(props.value * 100),
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    props.dispatch({
      type: "SET_ZOOM_LEVEL",
      payload: { zoomLevel: parseInt(e.target.value, 10) },
    }),
}))<ZoomLevelProps>`
  border: none;
  border-radius: 0;
  text-align: center;
  height: 100%;
  width: 60px;

  &:focus {
    outline: none;
  }
`;

const StyledZoomLevel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  border: 1px solid gray;
  border-radius: 2px;
  height: 30px;
  background-color: ${props => props.theme.colors.light};
`;

const ZoomIcon = styled(TiZoomOutline).attrs(props => ({
  size: "1.5em",
}))`
  color: ${props => props.theme.colors.dark};
  background-color: inherit;
  height: 100%;
`;

const PercentIcon = styled(FaPercent).attrs(props => ({
  size: "0.75em",
}))`
  color: ${props => props.theme.colors.dark};
  background-color: inherit;
  height: 100%;
  margin-right: 7px;
`;

const ZoomLevel = (props: ZoomLevelProps) => (
  <StyledZoomLevel>
    <ZoomIcon />
    <ZoomLevelInput {...props} />
    <PercentIcon />
  </StyledZoomLevel>
);

export default ZoomLevel;
