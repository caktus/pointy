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
import Input from '../../elements/Input/Input';
import { Link, useHistory } from 'react-router-dom';

import { SPRING } from '../../../styles/animations';

// Hooks
import useSocket from '../../../hooks/useSocket';

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

  const { connected, publish, subscribe } = useSocket();

  useEffect(() => {
    if (connected) {
      console.log('connected!!1')
      publish("test_event", { message: "stuff" });
    }
  }, [connected])

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
          <h3>Join a session</h3>
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
            <h3>Create a new session</h3>
            <p>(You'll be the administrator)</p>
          </CreateSessionCardStyled>
        </CardStyled>
      </StartPageActionCards>
    </StartPageStyled>
  );
}

export default StartPage;
