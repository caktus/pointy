import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  RoomContentStyled,
  RoomNameStyled,
  TicketSpace,
  RoomContentWrapper,
  RoomContentTop,
} from "./RoomContent.styled";

// Context
import { RoomContext } from "../../pages/RoomPage/RoomPage";

// Children
import UserStatusList from './UserStatusList/UserStatusList';
import PreviousTickets from '../PreviousTickets/PreviousTickets';
import phaseRouter from './PhaseRouter';

export const PHASES = {
  TICKET_CREATION: 'ticket_creation',
  VOTING: 'voting',
  RECONCILIATION: 'reconciliation'
}

const RoomContent = props => {
  const { room } = useContext(RoomContext);
  return (
    <RoomContentStyled>
      <RoomNameStyled>{room.name}</RoomNameStyled>
      <RoomContentWrapper>
        <RoomContentTop>
          <UserStatusList />
          <TicketSpace>
            <AnimatePresence>{phaseRouter(room.phase)}</AnimatePresence>
          </TicketSpace>
        </RoomContentTop>
        <PreviousTickets />
      </RoomContentWrapper>
    </RoomContentStyled>
  );
}

export default RoomContent;
