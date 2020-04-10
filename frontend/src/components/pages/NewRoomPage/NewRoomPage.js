import React, { useState } from "react";
import {
  NewRoomPageStyled,
  NewRoomHeading,
  NewRoomForm,
  InputStyled,
  ButtonStyled
} from "./NewRoomPage.styled";

// Router
import { useLocation } from 'react-router';

const NewRoomPage = props => {
  const { state: routerState } = useLocation();
  const [name, setName] = useState('');

  return (
    <NewRoomPageStyled>
      <NewRoomHeading>
        <h1>
          Welcome, <span>{routerState.username}</span>
        </h1>
      </NewRoomHeading>
      <NewRoomForm>
        <p>Name your session</p>
        <div>
          <InputStyled
            label="session name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
          />

          <ButtonStyled>Create session</ButtonStyled>
        </div>
      </NewRoomForm>
    </NewRoomPageStyled>
  );
}

export default NewRoomPage;
