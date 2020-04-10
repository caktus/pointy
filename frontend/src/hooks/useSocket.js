import { useContext, useEffect, useState } from "react";
import HomeSocketContext from '../context/HomeSocketContext';
import SessionSocketContext from "../context/SessionSocketContext";

export const useHomeSocket = () => {
    const homeSocket = useContext(HomeSocketContext);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (homeSocket) setConnected(homeSocket.waitForSocketConnection());
    }, [homeSocket])

    const publish = (eventName, data) => homeSocket.publish(eventName, data);

    const subscribe = (eventName, callback) => homeSocket.subscribe(eventName, callback);

    return { connected, publish, subscribe };
};

export const useSessionSocket = () => {
    const sessionSocket = useContext(SessionSocketContext);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (sessionSocket) setConnected(sessionSocket.waitForSocketConnection());
    }, [sessionSocket])

    const publish = (eventName, data) => sessionSocket.publish(eventName, data);

    const subscribe = (eventName, callback) => sessionSocket.subscribe(eventName, callback);

    return { connected, publish, subscribe };
};

