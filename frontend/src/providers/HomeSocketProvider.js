import React, { useEffect, useState } from "react";
import HomeSocketContext from "../context/HomeSocketContext";
import WebSocketConnection from '../services/WebSocket';
import { BASE_SOCKET_URL } from "../services/config";


export const HomeSocketProvider = ({ path, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!socket) {
      const url = BASE_SOCKET_URL + path;
      const newSocketConnector = WebSocketConnection
      newSocketConnector.connect(url);
      setSocket(newSocketConnector)
    }
    return () => {
      const readyState = socket?.getState()
      if (readyState 
        && (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN)
      ) {
        socket.close()
      }
    }
  }, [])

  return (
    <HomeSocketContext.Provider value={socket}>
      {socket ? children : <h2>Waiting for connection...</h2>}
    </HomeSocketContext.Provider>
  );
};
