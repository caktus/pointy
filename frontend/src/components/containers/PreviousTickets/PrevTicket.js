import React from 'react';
import { PrevTicketStyled } from './PrevTicket.styled';
import { AnimatePresence } from "framer-motion";

// Children
import TicketCard from './TicketCard';

const PrevTicket = ({ ticket }) => {
  return (
    <AnimatePresence>
      <PrevTicketStyled
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <p>{ticket.name}</p>
        <TicketCard point={ticket.point} />
      </PrevTicketStyled>
    </AnimatePresence>
  );
}

export default PrevTicket;
