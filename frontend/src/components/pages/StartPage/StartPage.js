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
import { useHomeSocket } from '../../../hooks/useSocket';
import { EVENT_TYPES } from '../../../services/WebSocket';
import NewRoomPage from '../NewRoomPage/NewRoomPage';
import { setUserToLS, getUserFromLS } from '../../../util/localStorageUser';


const StartPage = () => {
  const history = useHistory();
  const { publish, subscribe, connected } = useHomeSocket();
  const [username, setUsername] = useState(getUserFromLS() || '');
  const [rooms, setRooms] = useState([]);
  const [valueTemplates, setValueTemplates] = useState([]);
  const [errors, setErrors] = useState({});
  const [view, setView] = useState('start');
  /**
   *  Subscribe to "pointy_state" updates, 
   *  including new rooms added and current ValueTemplates
   **/ 
  useEffect(() => {
    if (connected) {
      console.log(`${Date()} SUBSCRIBED TO EVENT "${EVENT_TYPES.pointy_state}"`)
      subscribe(EVENT_TYPES.pointy_state, data => {
        console.log(`${Date()} RECEIVED EVENT "${EVENT_TYPES.pointy_state}: "`, data)
        setRooms(data.rooms);
        setValueTemplates(data.values_templates);
      });
    }
  }, [connected]);

  /**
   *  Publish "request_pointy_state" 
   *  Effectively, "Somebody just joined and needs initial point_state"
   **/ 
  useEffect(() => {
    if (connected) {
      console.log(`${Date()} PUBLISHING EVENT "${EVENT_TYPES.request_pointy_state}"`)
      publish(EVENT_TYPES.request_pointy_state, {});
    }
  }, [connected]);



  const handleSetUsername = e => {
    setErrors({
      ...errors,
      username: null
    });
    setUsername(e.target.value);
  }
  
  const handleCreateNewSession = () => {
    setView('newSession');
  }

  const handleOptionSelected = session => {
    if (!username) {
      return setErrors({ ...errors, username: "You must provide a username"})
    } 

    if (!session) return handleCreateNewSession(); 
    setUserToLS(username)
    history.push(`/${session}`, { username });
  }

  if (view === 'newSession') {
    return (
      <NewRoomPage
        rooms={rooms}
        publish={publish}
        username={username}
        valueTemplates={valueTemplates}
      />
    );
  }
  if (view === 'start') {
    return (
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
              {rooms && rooms.map((room) => (
                <StartPageRoomStyled key={room.session_id} layoutTransition={SPRING}>
                  <p onClick={() => handleOptionSelected(room.session_id)}>
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
    )
  }
}

export default StartPage;
