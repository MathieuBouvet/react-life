import React from "react";
import styled from "styled-components";
import { LifeAction } from "./lifeState";

const StyledCell = styled.div<CellProps>`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
`;

type CellProps = {
  alive: boolean;
  position: string;
  dispatch: React.Dispatch<LifeAction>;
};

const Cell = (props: CellProps) => <StyledCell {...props} />;

export default Cell;
