import React, { useContext } from 'react';
import { VoteValueStyled, ValueStyled } from "./VoteValue.styled";

// LS
import { getUserFromLS } from '../../../util/localStorageUser';

// Constants
import { PHASES } from '../RoomContent/RoomContent';
import { motion } from 'framer-motion';
import { LIST_ITEM_VARIANTS } from '../../../styles/animations';

// Context
import { RoomContext } from '../../pages/RoomPage/RoomPage';

const VoteValue = ({ value, selected, handleSelect }) => {
  const { publish, room } = useContext(RoomContext)

  function handleVote() {
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
