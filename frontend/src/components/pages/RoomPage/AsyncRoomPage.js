import React from "react";
import RoomPage from "./RoomPage";
import { SessionSocketProvider } from "../../../providers/SessionSocketProvider";
import { useParams } from "react-router";

const AsyncRoomPage = () => {
    let { sessionId } = useParams();
  return (
    <SessionSocketProvider path={`/${sessionId}/`}>
      <RoomPage />
    </SessionSocketProvider>
  );
};

export default AsyncRoomPage;
