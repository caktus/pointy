import React, { useState, useEffect, createContext } from "react";
import { RoomPageStyled, SpinnerWrapper } from "./RoomPage.styled";

// Route
import { useParams, useLocation } from 'react-router';

// Hooks
import useSocket from '../../../hooks/useSocket';

// Components
import PointySpinner from "../../elements/PointySpinner/PointySpinner";
import RoomContent from "../../containers/RoomContent/RoomContent";

export const RoomContext = createContext();

const FAKE_ROOM = {
  name: "Scarlet Crown Backlog Grooming",
  session_id: "scarlet_crown_backlog_grooming",
  users: [
    "michael himself",
    "gerald",
    "karen",
    "jeremy",
    "colin"
  ],
  admin: "gannon",
  votes: {
    "michael himself": 5,
    "gerald": 5,
    "karen": 3,
  },
  ticket: "RATOM-212 Do the thing all the times",
  values: [1, 2, 3, 5, 8, 13],
  prev_tickets: [
    { id: 1, name: "RATOM-199 Another thing", point: 5 },
    { id: 2, name: "SGA-1016 A feature for things", point: 3 }
  ]
};

const RoomPage = props => {
  let { sessionId } = useParams()
  const { state: routerState } = useLocation(); 
  const [room, setRoom] = useState();
  const { connected, publish, subscribe } = useSocket();

  useEffect(() => {
    console.log("connected: ", connected);
    if (connected) {
      console.log('setting room: ', FAKE_ROOM);
      setTimeout(() => setRoom(FAKE_ROOM), 1000)
      subscribe("room_updates", roomDetails => {
        // setRoom(JSON.parse(roomDetails))
      });
    }
  }, [connected]);

  const roomContext = {
    room,
    publish,
    subscribe
  }

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
