import React, { useState, useEffect } from "react";
import SessionSocketContext from "../context/SessionSocketContext";
import { SocketManager } from "../services/WebSocket";
import { BASE_SOCKET_URL } from "../services/config";

// logger
import logger from '../services/Logger'

export const SessionSocketProvider = ({ path, children }) => {
  const [openSocket, setOpenSocket] = useState();

  useEffect(() => {
    const url = BASE_SOCKET_URL + path
    logger('OPENING NEW Pointy CONNECTION')
    const socket = new WebSocket(url)
    new SocketManager(socket, setOpenSocket)

    return () => {
      const readyState = openSocket?.getState();
      if (readyState
        && (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN)
      ) {
        openSocket.close()
      }
    }
  }, []);

  return (
    <SessionSocketContext.Provider value={openSocket}>
      {openSocket ? children : <h2>Waiting for connection...</h2>}
    </SessionSocketContext.Provider>
  );
};
