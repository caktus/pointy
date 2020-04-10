import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  RoomContentStyled,
  RoomContentTop,
  WaitingForTicket,
} from "./RoomContent.styled";


// Context
import { RoomContext } from "../../pages/RoomPage/RoomPage";

// Children
import UserStatusList from './UserStatusList/UserStatusList';
import CurrentTicket from '../CurrentTicket/CurrentTicket';
import PointySpinner from '../../elements/PointySpinner/PointySpinner';
import PreviousTickets from '../PreviousTickets/PreviousTickets';


const RoomContent = props => {
  const { room } = useContext(RoomContext);
  return (
    <RoomContentStyled>
      <RoomContentTop>
        <UserStatusList />
        <AnimatePresence>
        {room.ticket ? (
          <CurrentTicket />
        ) : (
          <WaitingForTicket
            initial={{ opacity: 0, y: 50}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 50}}
          >
            Waiting for ticket
            <PointySpinner />
          </WaitingForTicket>
        )}
        </AnimatePresence>
      </RoomContentTop>

      <PreviousTickets />
    </RoomContentStyled>
  );
}

export default RoomContent;
