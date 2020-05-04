import { useContext } from "react";
import HomeSocketContext from '../context/HomeSocketContext';
import SessionSocketContext from "../context/SessionSocketContext";

export const useHomeSocket = () => {
  const homeSocket = useContext(HomeSocketContext);

  const publish = (eventName, data) => {
    homeSocket.waitForSocketConnection(() => homeSocket.publish(eventName, data))
  };

  const subscribe = (eventName, callback) => {
    homeSocket.waitForSocketConnection(() => homeSocket.subscribe(eventName, callback))
  };

  return { publish, subscribe };
};

export const useSessionSocket = () => {
    const sessionSocket = useContext(SessionSocketContext);

    const publish = (eventName, data) => {
      sessionSocket.waitForSocketConnection(() => sessionSocket.publish(eventName, data));
    }

    const subscribe = (eventName, callback) => {
      sessionSocket.waitForSocketConnection(() => sessionSocket.subscribe(eventName, callback));
    }

  return { sessionSocket, publish, subscribe };
};
