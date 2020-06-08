import React from "react";
import styled, { keyframes } from "styled-components";
import range from "../utils/range";

const growAndShrink = keyframes`
  0%, 80%, 100% {
    transform: scaleY(0.4)

  }
  40% {
    transform: scaleY(1)
  }
`;

const StyledLoader = styled.div<StyledLoaderProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  margin: auto;
  margin-bottom: 15px;
`;

const Bar = styled.div<BarProps>`
  height: 100%;
  width: 10px;
  background-color: ${props => props.color};
  animation: ${growAndShrink} 1000ms infinite ease-in-out;
  border-radius: 3px;
  animation-delay: ${props => props.delay + "s"};
  animation-fill-mode: backwards;
`;

type LoaderProps = {
  color: string;
  height: number;
  width: number;
  bars: number;
};
type OtionalLoaderProps = Partial<LoaderProps>;

type BarProps = Pick<LoaderProps, "color"> & { delay: number };
type StyledLoaderProps = Pick<LoaderProps, "height" | "width">;

const Loader = ({
  color = "black",
  height = 80,
  width = 80,
  bars = 5,
}: OtionalLoaderProps) => (
  <StyledLoader width={width} height={height}>
    {range(bars).map(num => (
      <Bar key={num} color={color} delay={num * 0.16} />
    ))}
  </StyledLoader>
);

export default Loader;
