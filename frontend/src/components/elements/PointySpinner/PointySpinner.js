import React from 'react';
import styled from "styled-components";
import { spin } from '../../../styles/animations';


function PointySpinner(props) {
    return <PointySpinnerStyled {...props}>👉</PointySpinnerStyled>
};


const PointySpinnerStyled = styled.span`
  display: inline-block;
  font-size: ${(props) => (props.large ? "10rem" : "3rem")};
  animation: ${spin} infinite 3s linear;
`;


export default PointySpinner;
