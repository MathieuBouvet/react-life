import React from "react";
import styled from "styled-components";

type InfoPageProps = { visible: boolean };

const StyledInfoPage = styled.div<InfoPageProps>`
  position: absolute;
  width: 100vw;
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  background-color: ${props => props.theme.colors.light};
  top: ${props => props.theme.headerHeight};
  left: 0;
  transform: ${props => `translateX(${props.visible ? 0 : "100vw"})`};
  transition: transform 500ms;
`;

const InfoPage = (props: InfoPageProps) => (
  <StyledInfoPage {...props}>
    <h1>Info Page</h1>
  </StyledInfoPage>
);

export default InfoPage;
