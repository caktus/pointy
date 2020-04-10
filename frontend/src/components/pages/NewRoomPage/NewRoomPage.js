import React, { useState, useEffect } from "react";
import {
  NewRoomPageStyled,
  NewRoomHeading,
  NewRoomForm,
  InputStyled,
  ButtonStyled
} from "./NewRoomPage.styled";

// Router
import { useLocation } from 'react-router';
import Select from "../../elements/Select/Select";

// hooks
import { useHomeSocket } from "../../../hooks/useSocket";
import { EVENT_TYPES } from "../../../services/WebSocket";

const NewRoomPage = props => {
  const { publish, subscribe } = useHomeSocket();
  const { state: routerState } = useLocation();
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    subscribe(EVENT_TYPES.pointy_state, message => {
      console.log('now we are runningt his one: ', message);
    });
  }, []);

  const handleInput = e => {
    setErrors({
      ...errors,
      sessionName: undefined
    });
    setName(e.target.value);
  }

  const handleTemplateSelect = e => {
    setTemplate(e.target.value)
  }

  const handleCreateSession = () => {
    if (!name) {
      return setErrors({
        ...errors,
        sessionName: "You must name your session"
      });
    }

    if (!template) {
      return setErrors({
        ...errors,
        template: "Select a template",
      });
    }
    createSession();
  }


  const createSession = () => {

  };

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
            onChange={handleInput}
            maxLength="50"
            errors={errors.sessionName}
          />

          <Select options={routerState.valueTemplates} value={template} onChange={handleTemplateSelect} error={errors.template}/>

          <ButtonStyled onClick={handleCreateSession}>
            Create session
          </ButtonStyled>
        </div>
      </NewRoomForm>
    </NewRoomPageStyled>
  );
}

export default NewRoomPage;
