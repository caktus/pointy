import React, { useRef } from "react";
import SocketContext from "../context/socketContext";
import WebSocketConnection from '../services/WebSocket';
import * as config from '../services/config';


export const SocketProvider = ({ path, opts, children }) => {
  const socketRef = useRef();
  
  if (!window) {
    return <>{children}</>;
  }

  if (!socketRef.current) {
    const rootUrl = config.BASE_SOCKET_URL;
    const url = rootUrl + path;
    socketRef.current = WebSocketConnection;
    socketRef.current.connect(url);
  }

  if (!socketRef.current) {
    return <h1>Connecting...</h1>
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
