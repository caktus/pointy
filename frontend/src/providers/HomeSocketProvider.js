import React, { useEffect, useState } from "react";
import HomeSocketContext from "../context/HomeSocketContext";
import { SocketManager } from '../services/WebSocket'
import { BASE_SOCKET_URL } from "../services/config";

// logger
import logger from '../services/Logger'


export const HomeSocketProvider = ({ path, children }) => {
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
  }, [])

  return (
    <HomeSocketContext.Provider value={openSocket}>
      {openSocket ? children : <h2>Waiting for connection...</h2>}
    </HomeSocketContext.Provider>
  );
};
