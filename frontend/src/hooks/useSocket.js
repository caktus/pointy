import { useContext, useEffect, useRef } from "react";
import SocketContext from '../context/socketContext';

const useSocket = (eventKey, callback) => {
    const socket = useContext(SocketContext);
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    const socketHandlerRef = useRef(function () {
        if (callbackRef.current) {
            callbackRef.current.apply(this, arguments);
        }
    });

    const subscribe = () => {
        if (eventKey) {
            socket.on(eventKey, socketHandlerRef.current);
        }
    };

    const unsubscribe = () => {
        if (eventKey) {
            socket.removeListener(eventKey, socketHandlerRef.current);
        }
    };

    useEffect(() => {
        subscribe();

        return unsubscribe;
    }, [eventKey]);

    return { socket, unsubscribe, subscribe };
};

export default useSocket;
