import React from 'react';
import { 
    UserListItemStyled,
    UserVote,
    LineStyled,
    UserName
} from './UserListItem.styled';

const UserListItem = ({ user, vote, ...props}) => {
  return (
    <UserListItemStyled {...props}>
        {vote ? <UserVote>{vote}</UserVote> : <LineStyled />}
        <UserName>{user}</UserName>
    </UserListItemStyled>
  );
}

export default UserListItem;
