import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  RoomContentStyled,
  RoomNameStyled,
  RoomContentWrapper,
  RoomContentTop,
  WaitingForTicket,
} from "./RoomContent.styled";


// Context
import { RoomContext } from "../../pages/RoomPage/RoomPage";

// Children
import UserStatusList from './UserStatusList/UserStatusList';
// import CurrentTicket from '../CurrentTicket/CurrentTicket';
// import PointySpinner from '../../elements/PointySpinner/PointySpinner';
import PreviousTickets from '../PreviousTickets/PreviousTickets';
// import { isEmpty } from '../../../util/isEmpty';
import phaseRouter from './PhaseRouter';

export const PHASES = {
  TICKET_CREATION: 'ticket_creation',
  VOTING: 'voting',
  RECONCILIATION: 'reconciliation'
}

const RoomContent = props => {
  const { room, user } = useContext(RoomContext);
  return (
    <RoomContentStyled>
      <RoomNameStyled>{room.name}</RoomNameStyled>
      <RoomContentWrapper>
        <RoomContentTop>
          <UserStatusList />
          <AnimatePresence>
            {phaseRouter(room.phase)}
          </AnimatePresence>
        </RoomContentTop>
        <PreviousTickets />
      </RoomContentWrapper>
    </RoomContentStyled>
  );
}

export default RoomContent;
