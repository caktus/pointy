import { useContext, useEffect, useState } from "react";
import SocketContext from '../context/socketContext';

const useSocket = () => {
    const socket = useContext(SocketContext);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (socket) {
            console.log('socket is: ', socket);
            setConnected(socket.waitForSocketConnection());
        }
    }, [socket])

    const publish = (eventName, data) => socket.publish(eventName, data);

    const subscribe = (eventName, callback) => socket.subscribe(eventName, callback);

    return { connected, publish, subscribe };
};

export default useSocket;
