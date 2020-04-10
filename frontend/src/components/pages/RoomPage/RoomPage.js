import React, { useState, useEffect, createContext } from "react";
import { RoomPageStyled, SpinnerWrapper } from "./RoomPage.styled";

// Route
import { useParams, useLocation, Redirect } from 'react-router';

// Hooks
import { useSessionSocket } from "../../../hooks/useSocket";

// Components
import PointySpinner from "../../elements/PointySpinner/PointySpinner";
import RoomContent from "../../containers/RoomContent/RoomContent";
import { EVENT_TYPES } from "../../../services/WebSocket";


const ROOM = {
 name: "Scarlet Crown Backlog Grooming",
 session_id: "scarlet_crown_backlog_grooming",
 users: [
   "michael himself",
   "gerald",
   "karen",
   "jeremy",
   "colin"
 ],
 admin: "gannon", // admin user only appears in this field
 votes: { // either send null values for people without votes, or don’t send them at all. Doesn’t matter.
   "michael himself": 5,
   "gerald": 5,
   "karen": 3,
 },
 ticket: { id: 1, name: "RATOM-212 Do the thing all the times"},
 values: [1, 2, 3, 5, 8, 13], //this are determined by the admin on room creation
 prev_tickets: [ // only send last 5
   { id: 1, name: "RATOM-199 Another thing", point: 5 },
   { id: 2, name: "SGA-1016 A feature for things", point: 3 }
 ],
 phase: "ticket_creation" // “ticket_creation|voting|reconciliation|” 
};


export const RoomContext = createContext();

const RoomPage = props => {
  let { sessionId } = useParams()
  const { state: routerState } = useLocation(); 
  const [room, setRoom] = useState();
  const { publish, subscribe } = useSessionSocket();

  useEffect(() => {
    subscribe(EVENT_TYPES.room_update, message => {
      console.log('response from room_update: ', message)
      setRoom(message);
    });
  }, []);

  useEffect(() => {
    publish(EVENT_TYPES.join_room, {
      session_id: sessionId,
      user: routerState && routerState.username,
    });
  }, []);

  const roomContext = {
    room: ROOM,
    publish,
    subscribe,
  };

  if (!routerState || !routerState.username || !sessionId) return <Redirect to="/" />;
  return (
    <RoomPageStyled>
      {ROOM ? (
        <RoomContext.Provider value={roomContext}>
          <RoomContent />
        </RoomContext.Provider>
      ) : (
        <SpinnerWrapper>
          <h1>Loading session...</h1>
          <PointySpinner large />
        </SpinnerWrapper>
      )}
    </RoomPageStyled>
  );
}

export default RoomPage;
