import React from 'react';
import { VoteValueStyled, ValueStyled } from "./VoteValue.styled";

const VoteValue = ({ value, selected, handleSelect }) => {

  const handleVote = () => {
    handleSelect();
    // publish('vote') w/ user and whatever else
  }

  return (
    <VoteValueStyled selected={selected} onClick={handleVote}>
      <ValueStyled selected={selected}>{value}</ValueStyled>
    </VoteValueStyled>
  );
}

export default VoteValue;
