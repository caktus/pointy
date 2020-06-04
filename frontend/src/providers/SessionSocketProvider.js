import React, { useState, useEffect } from "react";
import SessionSocketContext from "../context/SessionSocketContext";
import WebSocketConnection from "../services/WebSocket";
import { BASE_SOCKET_URL } from "../services/config";


export const SessionSocketProvider = ({ path, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!socket || socket?.getState() !== WebSocket.OPEN) {
      const url = BASE_SOCKET_URL + path;
      const newSocketConnector = WebSocketConnection
      console.log('OPENING NEW Session CONNECTION')
      newSocketConnector.connect(url, () => {
        console.log('NEW Session CONNECTION opened')
        setSocket(newSocketConnector)
      });
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
    <SessionSocketContext.Provider value={socket}>
      {socket ? children : <h2>Waiting for connection...</h2>}
    </SessionSocketContext.Provider>
  );
};
