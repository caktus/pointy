import React, { useState, useEffect, useContext } from "react";
import {
  NewRoomPageStyled,
  NewRoomHeading,
  NewRoomForm,
  InputStyled,
  ButtonStyled
} from "./NewRoomPage.styled";

import { useHistory } from "react-router";

import Select from "../../elements/Select/Select";

// hooks
import { EVENT_TYPES } from "../../../services/WebSocket";
import { setUserToLS } from "../../../util/localStorageUser";

const NewRoomPage = ({ rooms, username, valueTemplates, publish }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  const [errors, setErrors] = useState({});
  const [waitingForRoom, setWaitingForRoom] = useState(false);


  useEffect(() => {
    const newRoom = rooms.find(rm => rm.name === name);
    if (waitingForRoom && newRoom) {
      history.push(`/${newRoom.session_id}/`, { username });
      setUserToLS(username);
    }
  }, [rooms]);

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
    setWaitingForRoom(true);
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
