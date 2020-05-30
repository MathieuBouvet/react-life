import React from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LifeAction } from "./lifeState";

const StyledSizeInput = styled.div`
  margin-top: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NumberInput = styled.input.attrs({
  type: "number",
})`
  width: 75px;
  margin: 0 5px;
`;

const Dash = styled.span`
  height: 2px;
  flex-grow: 1;
  background-color: ${props => props.theme.colors.dark};
`;

const SizeLabel = styled.label`
  margin: 0 5px;
`;

type SizeInputProps = SpecializedInputProps & {
  label: string;
  changeAction: (newValue: number) => LifeAction;
};

type SpecializedInputProps = {
  value: number;
  dispatch: React.Dispatch<LifeAction>;
};

const SizeInput = ({
  label,
  value,
  dispatch,
  changeAction,
}: SizeInputProps) => (
  <StyledSizeInput>
    <FiChevronLeft size="1.5em" />
    <Dash />
    <SizeLabel>
      {label} :{" "}
      <NumberInput
        value={value}
        onChange={e => dispatch(changeAction(parseInt(e.target.value, 10)))}
      />
    </SizeLabel>
    <Dash />
    <FiChevronRight size="1.5em" />
  </StyledSizeInput>
);
