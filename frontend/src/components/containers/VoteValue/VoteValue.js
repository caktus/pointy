import React, { useContext } from 'react';
import { VoteValueStyled, ValueStyled } from "./VoteValue.styled";
import { RoomContext } from '../../pages/RoomPage/RoomPage';
import { getUserFromLS } from '../../../util/localStorageUser';

const VoteValue = ({ value, selected, handleSelect }) => {
  const { publish } = useContext(RoomContext)

  const handleVote = () => {
    if (handleSelect) {
      handleSelect();
      publish('vote', {
        user: getUserFromLS(),
        point: value
      })
    };
  }

  return (
    <VoteValueStyled selected={selected} onClick={handleVote} interactive={handleSelect}>
      <ValueStyled selected={selected}>{value}</ValueStyled>
    </VoteValueStyled>
  );
}

export default VoteValue;
