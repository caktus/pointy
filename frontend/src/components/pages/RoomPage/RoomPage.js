import React, { useState, useEffect, createContext } from "react";
import { RoomPageStyled, SpinnerWrapper } from "./RoomPage.styled";

// Route
import { useParams, useLocation } from 'react-router';

// Hooks
import { useSessionSocket } from "../../../hooks/useSocket";

// Components
import PointySpinner from "../../elements/PointySpinner/PointySpinner";
import RoomContent from "../../containers/RoomContent/RoomContent";
import { EVENT_TYPES } from "../../../services/WebSocket";

export const RoomContext = createContext();

// const FAKE_ROOM = {
//   name: "Scarlet Crown Backlog Grooming",
//   session_id: "scarlet_crown_backlog_grooming",
//   users: [
//     "michael himself",
//     "gerald",
//     "karen",
//     "jeremy",
//     "colin"
//   ],
//   admin: "gannon",
//   votes: {
//     "michael himself": 5,
//     "gerald": 5,
//     "karen": 3,
//   },
//   ticket: "RATOM-212 Do the thing all the times",
//   values: [1, 2, 3, 5, 8, 13],
//   prev_tickets: [
//     { id: 1, name: "RATOM-199 Another thing", point: 5 },
//     { id: 2, name: "SGA-1016 A feature for things", point: 3 }
//   ]
// };

const RoomPage = props => {
  let { sessionId } = useParams()
  const { state: routerState } = useLocation(); 
  const [room, setRoom] = useState();
  const { publish, subscribe } = useSessionSocket();

  useEffect(() => {
    subscribe(EVENT_TYPES.room_update, message => {
      console.log('response from room_update: ', message)
    });
  }, []);

  useEffect(() => {
    publish(EVENT_TYPES.join_room, {
      session_id: sessionId,
      user: routerState.username
    });
  }, []);

  const roomContext = {
    room,
    publish,
    subscribe
  }
  if (!sessionId) return <PointySpinner large/>
  return (
    <RoomPageStyled>
      {room ? (
        <RoomContext.Provider value={roomContext}>
          <RoomContent />
        </RoomContext.Provider>
      ) : (
        <SpinnerWrapper>
          <PointySpinner large />
        </SpinnerWrapper>
      )}
    </RoomPageStyled>
  );
}

export default RoomPage;
