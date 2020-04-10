import React from 'react';
import { TicketCardStyled, TicketValueStyled } from './TicketCard.styled';

const TicketCard = ({ point }) => {
  return (
    <TicketCardStyled>
        <TicketValueStyled>{point}</TicketValueStyled>
    </TicketCardStyled>
  );
}

export default TicketCard;
