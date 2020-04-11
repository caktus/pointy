import React, { useContext } from 'react';
import { VoteValueStyled, ValueStyled } from "./VoteValue.styled";
import { RoomContext } from '../../pages/RoomPage/RoomPage';
import { getUserFromLS } from '../../../util/localStorageUser';
import { PHASES } from '../RoomContent/RoomContent';
import { motion } from 'framer-motion';
import { LIST_ITEM_VARIANTS } from '../../../styles/animations';

const VoteValue = ({ value, selected, handleSelect }) => {
  const { publish, room } = useContext(RoomContext)

  const handleVote = () => {
    if (handleSelect) {
      handleSelect();
      publish('vote', {
        user: getUserFromLS(),
        point: value
      })
    };
  }

  const getSelected = () => {
    if (room.phase === PHASES.VOTING) return selected;
  }

  const getFilled = () => {
    if (room.phase === PHASES.RECONCILIATION) {
      const userCount = room.users.filter((user) => user !== room.admin).length;
      let votes = 0;
      for (const user in room.votes) {
        if (room.votes.hasOwnProperty(user)) {
          const vote = room.votes[user];
          if (parseInt(vote, 10) === value) votes ++
        }
      }
      console.log(value, ": ", (votes / userCount) * 100);
      return (votes / userCount) * 100
    }
  }

  return (
    <motion.div variants={LIST_ITEM_VARIANTS}>
      <VoteValueStyled
        selected={getSelected()}
        filled={getFilled()}
        onClick={handleVote}
        interactive={handleSelect}
      >
        <ValueStyled selected={getSelected()} filled={getFilled()}>
          {value}
        </ValueStyled>
      </VoteValueStyled>
    </motion.div>
  );
}

export default VoteValue;
