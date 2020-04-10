import React, { useContext } from 'react';
import { PreviousTicketsStyled } from './PreviousTickets.styled';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';
import PrevTicket from './PrevTicket';


const PreviousTickets = props => {
  const { room } = useContext(RoomContext);

  return (
    <PreviousTicketsStyled>
      {room.prev_tickets && room.prev_tickets.map(ticket => <PrevTicket key={ticket.name} ticket={ticket} />)}
    </PreviousTicketsStyled>
  );
}

export default PreviousTickets;
