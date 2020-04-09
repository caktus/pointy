import React from 'react';
import { RoomPageStyled } from './RoomPage.styled';

// Route
import { useParams } from 'react-router';

const RoomPage = props => {
    let { room } = useParams()
  return (
    <RoomPageStyled>
      <p>Room is {room}</p>
    </RoomPageStyled>
  );
}

export default RoomPage;
