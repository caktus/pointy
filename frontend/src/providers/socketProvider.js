import React, { useRef } from "react";
import io from "socket.io-client";
import * as config from '../config/config';
import SocketContext from "../context/socketContext";


export const SocketProvider = ({ url, opts, children }) => {
  const socketRef = useRef();
  
  if (!window) {
    return <>{children}</>;
  }

  if (!socketRef.current) {
    const options = {
      ...config.BASE_SOCKET_OPTIONS,
      ...opts
    };
    socketRef.current = io(url, options);
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
