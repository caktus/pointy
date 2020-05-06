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
  const { sessionSocket, publish, subscribe } = useSessionSocket();

  useEffect(() => {
    if (!sessionSocket) history.replace('/')
  })

  useEffect(() => {
    const user = getUserFromLS();
    setUser(user);
  }, []);

  useEffect(() => {
    subscribe(EVENT_TYPES.room_update, message => {
      setRoom(message);
    });
  }, []);

  useEffect(() => {
    const thisUser = routerState ? routerState.username : user
    sessionSocket.setUser(thisUser)
    publish(EVENT_TYPES.join_room, {
      session_id: sessionId,
      user: thisUser
    });
  }, []);

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
