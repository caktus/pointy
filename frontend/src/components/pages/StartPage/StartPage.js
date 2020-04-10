import React, { useState, useEffect } from 'react';
import {
  StartPageStyled,
  StartPageUsername,
  StartPageActionCards,
  CardStyled,
  StartPageRoomsListStyled,
  StartPageRoomStyled,
  CreateSessionCardStyled,
} from "./StartPage.styled";
import { motion } from "framer-motion";
import Input from '../../elements/Input/Input';
import { useHistory } from 'react-router-dom';

import { SPRING } from '../../../styles/animations';

// Hooks
import { HomeSocketProvider } from '../../../providers/HomeSocketProvider';
import { useHomeSocket } from '../../../hooks/useSocket';
import { EVENT_TYPES } from '../../../services/WebSocket';

// TODO: REMOVE
const rooms = [
  {
    name: "Scarlet Crown Backlog Grooming 4/2/2020",
    room: "scarlet_crown_backlog_grooming",
  },
  { 
    name: "Disco Sprint Planning 4/9/2020", 
    room: "disco_sprint_planning" 
  },
];

const StartPage = props => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const { connected, publish, subscribe } = useHomeSocket();
  /**
   *  Subscribe to "pointy_state" updates, 
   *  including new rooms added and current ValueTemplates
   **/ 
  useEffect(() => {
    if (connected) {
      subscribe(EVENT_TYPES.POINTY_STATE, data => {
        console.log('pointy state!: ', data);
      });
    };
  }, [connected, subscribe]);

  /**
   *  Publish "request_pointy_state" 
   *  Effectively, "Somebody just joined and needs initial point_state"
   **/ 
  useEffect(() => {
    if (connected) publish(EVENT_TYPES.REQUEST_POINTY_STATE, {});
  }, [connected, publish]);



  const handleSetUsername = e => {
    setErrors({
      ...errors,
      username: null
    });
    setUsername(e.target.value);
  }
  
  const handleCreateNewSession = () => {
    history.push("/new", { username });
  }

  const handleOptionSelected = session => {
    if (!username) {
      return setErrors({ ...errors, username: "You must provide a username"})
    } 

    if (!session) return handleCreateNewSession(); 
    history.push(`/${session}`, { username });
  }

  return (
    <HomeSocketProvider path="/">
      <StartPageStyled>
        <h1>Welcome to Pointy!</h1>

        <StartPageUsername>
          <Input
            type="text"
            label="username"
            value={username}
            onChange={handleSetUsername}
            maxLength="23"
            errors={errors.username || []}
          />
        </StartPageUsername>

        <StartPageActionCards>
          <CardStyled>
            <motion.h3 layoutTransition={SPRING}>Join a session</motion.h3>
            <StartPageRoomsListStyled>
              {rooms.map((room) => (
                <StartPageRoomStyled key={room.room} layoutTransition={SPRING}>
                  <p onClick={() => handleOptionSelected(room.room)}>
                    {room.name}
                  </p>
                </StartPageRoomStyled>
              ))}
            </StartPageRoomsListStyled>
          </CardStyled>

          <CardStyled onClick={() => handleOptionSelected()}>
            <CreateSessionCardStyled>
              <motion.h3 layoutTransition={SPRING}>Create a new session</motion.h3>
              <motion.p layoutTransition={SPRING}>(You'll be the administrator)</motion.p>
            </CreateSessionCardStyled>
          </CardStyled>
        </StartPageActionCards>
      </StartPageStyled>
    </HomeSocketProvider>
  );
}

export default StartPage;
