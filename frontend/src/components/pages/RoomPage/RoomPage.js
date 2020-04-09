import React from 'react';
import { RoomPageStyled } from './RoomPage.styled';

// Route
import { useParams, useLocation } from 'react-router';
import PointySpinner from '../../elements/PointySpinner/PointySpinner';

const RoomPage = props => {
  let { room } = useParams()
  const { state: routerState } = useLocation(); 



  return (
    <RoomPageStyled>
      <p>Room is {room} and username is {routerState.username}</p>
      <PointySpinner large/>
    </RoomPageStyled>
  );
}

export default RoomPage;
