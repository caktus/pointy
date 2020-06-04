import React, { useState, useEffect, createContext } from "react";
import { RoomPageStyled, SpinnerWrapper } from "./RoomPage.styled";

// Route
import { useParams, useLocation, useHistory, Redirect } from 'react-router';

// Hooks
import { useSessionSocket } from "../../../hooks/useSocket";

// Components
import PointySpinner from "../../elements/PointySpinner/PointySpinner";
import RoomContent from "../../containers/RoomContent/RoomContent";
import { EVENT_TYPES } from "../../../services/WebSocket";
import { getUserFromLS } from "../../../util/localStorageUser";


export const RoomContext = createContext();

const RoomPage = props => {
  let { sessionId } = useParams()
  const history = useHistory();
  const { state: routerState } = useLocation(); 
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const { sessionSocket, publish, subscribe, connected } = useSessionSocket();

  useEffect(() => {
    if (!sessionSocket) history.replace('/')
  })

  useEffect(() => {
    const user = getUserFromLS();
    setUser(user);
  }, []);

  useEffect(() => {
    if (connected) {
      console.log(`SUBSCRIBED TO EVENT "${EVENT_TYPES.room_update}": ${sessionId}, as ${user}`)
      subscribe(EVENT_TYPES.room_update, message => {
        console.log(`RECEIVED EVENT "${EVENT_TYPES.room_update}": ${sessionId}, as ${user}: `, message)
        setRoom(message);
      });
    }
  }, [connected]);

  useEffect(() => {
    if (connected) {
      const thisUser = routerState ? routerState.username : user
      sessionSocket.setUser(thisUser)
      console.log(`PUBLISHING EVENT "${EVENT_TYPES.join_room}": ${sessionId}, as ${thisUser}`)
      publish(EVENT_TYPES.join_room, {
        session_id: sessionId,
        user: thisUser
      });
    }
  }, [connected]);

  const roomContext = {
    room,
    publish,
    subscribe,
    user
  };

  if (!routerState || !routerState.username || !sessionId) return <Redirect to="/" />;
  return (
    <RoomPageStyled>
      {room ? (
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
