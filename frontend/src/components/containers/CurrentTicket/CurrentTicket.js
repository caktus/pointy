import React, { useContext, useState } from 'react';
import {
  CurrentTickerWrapper,
  TicketName, 
  PhaseName,
  CancelTicketIcon,
  CurrentTicketStyled,
} from "./CurrentTicket.styled";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from 'framer-motion';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';
import { getUserFromLS } from "../../../util/localStorageUser";

// Const
import { LIST_VARIANTS } from "../../../styles/animations";
import { EVENT_TYPES } from "../../../services/WebSocket";

// Children
import VoteValue from '../VoteValue/VoteValue';


const CurrentTicket = () => {
  const { room, publish } = useContext(RoomContext);
  const [selectedTicket, setSelectedTicket] = useState();

  const _userIsAdmin = () => {
    return getUserFromLS() === room.admin;
  }

  const getSelectedState = value => {
    return _userIsAdmin()
      ? Object.values(room.votes).includes(value.toString())
      : value === selectedTicket;
  }

  const getHandleSelect = value => {
    if (!_userIsAdmin()) return () => setSelectedTicket(value);
  }

  const handleCancelTicket = () => {
    publish(EVENT_TYPES.ticket_cancelled);
  }

  return (
    <CurrentTickerWrapper>
      <AnimatePresence>
        <TicketName
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {room.ticket.name}
          <PhaseName
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            [{room.phase}]
          </PhaseName>
          {_userIsAdmin() && <CancelTicketIcon icon={faTimes} onClick={handleCancelTicket}/>}
        </TicketName>
      </AnimatePresence>
      <CurrentTicketStyled
        initial="initial"
        animate="enter"
        exit="exit"
        variants={LIST_VARIANTS}
      >
        {room.values.map((value) => {
          return (
            <VoteValue
              key={value}
              value={value}
              selected={getSelectedState(value)}
              handleSelect={getHandleSelect(value)}
            />
          );
        })}
      </CurrentTicketStyled>
    </CurrentTickerWrapper>
  );
}

export default CurrentTicket;
