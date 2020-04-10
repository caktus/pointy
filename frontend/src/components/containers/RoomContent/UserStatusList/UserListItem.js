import React from 'react';
import PropTypes from 'prop-types';
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

UserListItem.propTypes = {};

UserListItem.defaultProps = {};

export default UserListItem;
