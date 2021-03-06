import React, { useRef } from "react";
import SessionSocketContext from "../context/SessionSocketContext";
import WebSocketConnection from "../services/WebSocket";
import { BASE_SOCKET_URL } from "../services/config";


export const SessionSocketProvider = ({ path, children }) => {
  const socketRef = useRef();

  if (!socketRef.current) {
    const url = BASE_SOCKET_URL + path;
    socketRef.current = WebSocketConnection;
    socketRef.current.connect(url);
  }

  return (
    <SessionSocketContext.Provider value={socketRef.current}>
      {socketRef.current ? children : null}
    </SessionSocketContext.Provider>
  );
};
