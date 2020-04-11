import React, { useContext, useState } from 'react';
import { CurrentTicketStyled } from './CurrentTicket.styled';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';

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
    <CurrentTicketStyled>
      {room.values.map(value => {
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
  );
}

export default CurrentTicket;
