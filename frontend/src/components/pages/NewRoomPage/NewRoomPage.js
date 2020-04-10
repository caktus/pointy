import React, { useState, useEffect } from "react";
import {
  NewRoomPageStyled,
  NewRoomHeading,
  NewRoomForm,
  InputStyled,
  ButtonStyled
} from "./NewRoomPage.styled";

import Select from "../../elements/Select/Select";

// hooks
import { EVENT_TYPES } from "../../../services/WebSocket";

const NewRoomPage = ({ rooms, username, valueTemplates, publish }) => {
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setErrors({
      ...errors,
      sessionName: []
    });
    setName(e.target.value);
  }

  const handleTemplateSelect = e => {
    setErrors({
      ...errors,
      template: '',
    });
    setTemplate(e.target.value)
  }

  const handleCreateSession = () => {
    if (name && template) createSession();
    if (!name) {
      setErrors({
        ...errors,
        sessionName: "You must name your session"
      });
    }
    if (!template) {
      setErrors({
        ...errors,
        template: "Select a template",
      });
    }
  }

  const _createSessionIdFromName = () => {
    return name.toLocaleLowerCase().split(' ').join('_');
  }


  const createSession = () => {
    publish(EVENT_TYPES.room_created, {
      room_name: name,
      session_id: _createSessionIdFromName(),
      admin_name: username,
      values_template_id: template
    });
  };

  return (
    <NewRoomPageStyled>
      <NewRoomHeading>
        <h1>
          Welcome, <span>{username}</span>
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

          <Select options={valueTemplates} value={template} onChange={handleTemplateSelect} error={errors.template}/>

          <ButtonStyled onClick={handleCreateSession}>
            Create session
          </ButtonStyled>
        </div>
      </NewRoomForm>
    </NewRoomPageStyled>
  );
}

export default NewRoomPage;
