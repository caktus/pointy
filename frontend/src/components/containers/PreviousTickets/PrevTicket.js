import React from 'react';
import { PrevTicketStyled } from './PrevTicket.styled';

// Children
import TicketCard from './TicketCard';

const PrevTicket = ({ ticket }) => {
  return (
    <PrevTicketStyled>
      <p>{ticket.name}</p>
      <TicketCard vote={ticket.point}/>
    </PrevTicketStyled>
  );
}

export default PrevTicket;
