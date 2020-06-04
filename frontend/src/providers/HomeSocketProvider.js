import React, { useEffect, useState } from "react";
import HomeSocketContext from "../context/HomeSocketContext";
import { SocketManager } from '../services/WebSocket'
import { BASE_SOCKET_URL } from "../services/config";


export const HomeSocketProvider = ({ path, children }) => {
  const [openSocket, setOpenSocket] = useState();

  useEffect(() => {
    const url = BASE_SOCKET_URL + path
    console.log('OPENING NEW Pointy CONNECTION')
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
    // if (!socket || socket?.getState() !== WebSocket.OPEN) {
    //   const url = BASE_SOCKET_URL + path;
    //   const newSocketConnector = WebSocketConnection
    //   console.log('OPENING NEW Pointy CONNECTION')
    //   newSocketConnector.connect(url, () => {
    //     console.log('NEW Pointy CONNECTION opened')
    //     setSocket(newSocketConnector)
    //   });
    // }
    // return () => {
    //   const readyState = socket?.getState()
      // if (readyState 
      //   && (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN)
      // ) {
      //   socket.close()
      // }
    // }
  // }, [])

  return (
    <HomeSocketContext.Provider value={openSocket}>
      {openSocket ? children : <h2>Waiting for connection...</h2>}
    </HomeSocketContext.Provider>
  );
};
