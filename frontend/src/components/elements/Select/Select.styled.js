import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colorCaution } from '../../../styles/colors';


export const SelectWrapper = styled.div`
    width: 100%;
`;

export const SelectStyled = styled.select`
    padding: 2rem;
`;

export const OptionStyled = styled.option`

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
