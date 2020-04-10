import React, { useRef } from "react";
import HomeSocketContext from "../context/HomeSocketContext";
import WebSocketConnection from '../services/WebSocket';
import { BASE_SOCKET_URL } from "../services/config";


export const HomeSocketProvider = ({ path, children }) => {
  const socketRef = useRef();

  if (!socketRef.current) {
    const url = BASE_SOCKET_URL + path;
    socketRef.current = WebSocketConnection;
    socketRef.current.connect(url);
  }

  if (!socketRef.current) {
    return <h1>Connecting...</h1>
  }

  return (
    <HomeSocketContext.Provider value={socketRef.current}>
      {children}
    </HomeSocketContext.Provider>
  );
};
