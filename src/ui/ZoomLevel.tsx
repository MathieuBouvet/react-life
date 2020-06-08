import React from "react";
import styled from "styled-components";
import { LifeAction } from "../lifeState";

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
  &:focus {
    outline: none;
  }
`;

export default ZoomLevelInput;
