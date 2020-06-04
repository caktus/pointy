import { useState, useEffect, useContext } from "react";
import HomeSocketContext from '../context/HomeSocketContext';
import SessionSocketContext from "../context/SessionSocketContext";

export const useHomeSocket = () => {
  const [connected, setConnected] = useState(false);
  const homeSocket = useContext(HomeSocketContext);

  useEffect(() => {
    if (homeSocket.getState() === WebSocket.OPEN) setConnected(true)
  }, [homeSocket])

  const publish = (eventName, data) => {
    homeSocket.publish(eventName, data);
  };

  const subscribe = (eventName, callback) => {
    homeSocket.subscribe(eventName, callback);
  };

  return { publish, subscribe, connected};
};

export const useSessionSocket = () => {
  const [connected, setConnected] = useState(false);
  const sessionSocket = useContext(SessionSocketContext);

  useEffect(() => {
    if (sessionSocket.getState() === WebSocket.OPEN) setConnected(true)
  }, [sessionSocket])

  const publish = (eventName, data) => {
    sessionSocket.publish(eventName, data);
  };

  const subscribe = (eventName, callback) => {
    sessionSocket.subscribe(eventName, callback);
  };

  return { sessionSocket, publish, subscribe, connected };
};
