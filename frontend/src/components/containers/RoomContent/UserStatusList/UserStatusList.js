import React, { useContext } from "react";
import { UserStatusListStyled, AdminUserStyled } from "./UserStatusList.styled";
import { AnimatePresence } from 'framer-motion';

// Context
import { RoomContext } from "../../../pages/RoomPage/RoomPage";
import UserListItem from "./UserListItem";
import { getUserFromLS } from "../../../../util/localStorageUser";


const UserStatusList = props => {
  const { room } = useContext(RoomContext)
  return (
    <AnimatePresence>
      {room && (
        <UserStatusListStyled
          initial={{ opacity: 0, x: '-50'}}
          animate={{ opacity: 1, x: 0}}
          exit={{ opacity: 0, x: '-50'}}
        >
          {room.users.filter(user => user !== room.admin).map(user => {
            const vote = room.votes && room.votes[user];
            return <UserListItem layoutTransition key={user} user={user} vote={vote}/>
          })}
          <AdminUserStyled current={getUserFromLS() === room.admin}>{room.admin}</AdminUserStyled>
        </UserStatusListStyled>
      )}
    </AnimatePresence>
  );
}

export default UserStatusList;
