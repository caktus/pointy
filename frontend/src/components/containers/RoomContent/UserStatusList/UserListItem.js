import React from 'react';
import { 
    UserListItemStyled,
    UserVote,
    LineStyled,
    UserName
} from './UserListItem.styled';
import { AnimatePresence } from 'framer-motion';
import { getUserFromLS } from '../../../../util/localStorageUser';

const UserListItem = ({ user, vote, ...props}) => {
  return (
    <UserListItemStyled {...props}>
      <AnimatePresence>
        {vote ? (
          <UserVote {...voteAnimations}>{vote}</UserVote>
        ) : (
          <LineStyled {...lineAnimations} />
        )}
      </AnimatePresence>
      <UserName current={getUserFromLS() === user} >{user}</UserName>
    </UserListItemStyled>
  );
}

const voteAnimations = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-15' }
}

const lineAnimations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default UserListItem;
