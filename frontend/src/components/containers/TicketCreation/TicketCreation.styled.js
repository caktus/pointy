import styled from 'styled-components';
import { motion } from 'framer-motion';
import Input from "../../elements/Input/Input";
import { Button } from 'reaktus';


export const TicketCreationStyled = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
`;

export const InputStyled = styled(Input)`
  & > input {
    width: 50rem;
    padding: 1rem;
  }

  & > label {
    left: 5%;
  }

`;

export const ButtonStyled = styled(Button)`
  font-size: 2rem;
  font-family: "Inconsolata", monospace;
  margin-top: 4rem;
  align-self: flex-end;
`;


export const WaitingForTicket = styled(motion.h3)`
  margin-top: 4rem;

  span {
    margin-left: 1rem;
  }
`;


