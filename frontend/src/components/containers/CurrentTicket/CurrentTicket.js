import React, { useContext, useState } from 'react';
import { CurrentTicketStyled } from './CurrentTicket.styled';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';

// Children
import VoteValue from '../VoteValue/VoteValue';


const CurrentTicket = props => {
    const { room } = useContext(RoomContext);
    const [selectedTicket, setSelectedTicket] = useState();
    
    return (
        <CurrentTicketStyled>
            {room.values.map(value => {
                return (
                  <VoteValue
                    key={value}
                    value={value}
                    selected={value === selectedTicket}
                    handleSelect={() => setSelectedTicket(value)}
                  />
                );
            })}
        </CurrentTicketStyled>
    );
}

export default CurrentTicket;
