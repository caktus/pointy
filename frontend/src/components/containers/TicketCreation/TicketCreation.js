import React, { useState, useContext } from "react";
import {
  TicketCreationStyled,
  WaitingForTicket,
  InputStyled,
  ButtonStyled,
} from "./TicketCreation.styled";

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';
import { getUserFromLS } from '../../../util/localStorageUser';

// Childen
import PointySpinner from '../../elements/PointySpinner/PointySpinner';
import { EVENT_TYPES } from "../../../services/WebSocket";


const TicketCreation = () => {
  const { room, publish } = useContext(RoomContext)
  const [ticketName, setTicketName] = useState('');

  const handleCreateTicket = () => {
    if (ticketName) {
      publish(EVENT_TYPES.ticket_created, { ticket_name: ticketName });
    }
  }

  if (getUserFromLS() !== room.admin) {
    return (
      <WaitingForTicket
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        Waiting for ticket
        <PointySpinner />
      </WaitingForTicket>
    );
  }

  return (
    <TicketCreationStyled
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <InputStyled
        label="ticket name"
        value={ticketName}
        onChange={e => setTicketName(e.target.value)}
        maxLength="100"
        onEnterKey={handleCreateTicket}
      />
      <ButtonStyled onClick={handleCreateTicket}>Create ticket</ButtonStyled>
    </TicketCreationStyled>
  );

}

export default TicketCreation;
