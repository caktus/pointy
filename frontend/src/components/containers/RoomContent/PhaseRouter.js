import React from 'react';
import { PHASES } from './RoomContent';

import TicketCreation from '../TicketCreation/TicketCreation';
import CurrentTicket from '../CurrentTicket/CurrentTicket';

export default function phaseRouter(phase) {
    switch (phase) {
      case PHASES.TICKET_CREATION:
        return <TicketCreation />;
      case PHASES.VOTING:
        return <CurrentTicket />;
      case PHASES.RECONCILIATION:
        return <CurrentTicket />; 
      default:
        return null;
    }
}
