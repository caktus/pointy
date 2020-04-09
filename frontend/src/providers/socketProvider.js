import React, { useRef } from "react";
import io from "socket.io-client";
import SocketContext from "../context/socketContext";


export const SocketProvider = ({ url, opts, children }) => {
  const socketRef = useRef();
  
  if (!window) {
    return <>{children}</>;
  }

  if (!socketRef.current) {
    socketRef.current = io(url, opts || {});
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
