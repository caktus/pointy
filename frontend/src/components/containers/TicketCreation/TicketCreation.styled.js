import styled from 'styled-components';
import { motion } from 'framer-motion';
import Input from "../../elements/Input/Input";
import { Button } from 'reaktus';


export const TicketCreationStyled = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin: 5rem auto 0;
    width: 100%;
    max-width: 500px;
`;

export const InputStyled = styled(Input)`
  & > input {
    width: 100%;
    padding: 2.5rem;
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


