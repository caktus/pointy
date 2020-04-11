import React, { useContext, useState } from 'react';
import {
  CurrentTickerWrapper,
  TicketName, 
  CurrentTicketStyled,
} from "./CurrentTicket.styled";

import { AnimatePresence } from 'framer-motion';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';

// Const
import { LIST_VARIANTS } from "../../../styles/animations";

// Children
import VoteValue from '../VoteValue/VoteValue';
import { getUserFromLS } from '../../../util/localStorageUser';


const CurrentTicket = () => {
  const { room } = useContext(RoomContext);
  const [selectedTicket, setSelectedTicket] = useState();

  const getSelectedState = value => {
    const isAdmin = getUserFromLS() === room.admin;
    return isAdmin
      ? Object.values(room.votes).includes(value.toString())
      : value === selectedTicket;
  }

  const getHandleSelect = value => {
    const isAdmin = getUserFromLS() === room.admin;
    if (!isAdmin) return () => setSelectedTicket(value);
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
