import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  colorWhite,
  colorPrimary,
  colorGrey,
  colorCaution,
} from "../../../styles/colors";
import { motion } from "framer-motion";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LabelStyled = styled.label`
  position: absolute;
  top: 30%;
  left: 15%;

  letter-spacing: 0.7px;
  font-size: 1.5rem;
  font-family: 'Inconsolata', monospace;

  padding: 0;
  background: transparent;
  transition: all 0.2s ease-in-out, background 0.1s linear;

  pointer-events: none;

  color: ${(props) => (props.hasErrors ? colorCaution : colorGrey)};

  ${(props) => {
    if (props.labelTranslated) {
      return css`
        transform: translate(-10%, -125%) scale(0.8);
        background: ${colorWhite};
        padding: 0 0.4rem;
      `;
    }
  }}
`;

export const IconStyled = styled(FontAwesomeIcon)`
  position: absolute;
`;

export const InputStyled = styled.input`
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => (props.hasErrors ? colorCaution : colorGrey)};
  border-radius: 3px;

  margin-bottom: 1.5rem;

  font-size: 2rem;
  width: 24rem;
  height: 3rem;
  font-family: 'Inconsolata', monospace;

  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${colorPrimary};
    & + label {
      color: ${colorPrimary};
    }
  }

  outline: none;

  padding: 2rem;
  color: ${colorGrey};
`;

export const ErrorsStyled = styled(motion.div)`
  margin: 0;
  /* margin-top: 2rem; */
`;

export const ErrorStyled = styled.p`
  color: ${colorCaution};
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

export const ErrorIcon = styled(FontAwesomeIcon)`
  color: ${colorCaution};
  margin-right: 0.5rem;
`;
