import React, { useRef } from "react";
import SocketContext from "../context/socketContext";
import WebSocketConnection from '../services/WebSocket';
import * as config from '../services/config';


export const SocketProvider = ({ path, opts, children }) => {
  const socketRef = useRef();
  
  console.log("socketRef", socketRef);

  if (!socketRef.current) {
    const rootUrl = config.BASE_SOCKET_URL;
    console.log("THIS THIS THIS ", rootUrl);
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
