import { useContext, useEffect, useState } from "react";
import SocketContext from '../context/socketContext';

const useSocket = () => {
    const socket = useContext(SocketContext);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        setConnected(socket && socket.socket.readyState === window.WebSocket.OPEN);
    }, [socket])

    const publish = (eventName, data) => {
        if (connected) socket.publish(eventName, data)
    }

    const subscribe = (eventName, callback) => {
        if (connected) socket.subscribe(eventName, callback);
    }
    
//   subscribe(eventName, callback) {
//     this.callbacks = {
//       ...this.callbacks,
//       [eventName]: callback,
//     };
//   }

//   publish(eventName, data) {
//     const msg = { type: eventName, ...data };
//     this.socket.send(JSON.stringify(msg));
//   }


    return { publish, subscribe }
};

export default useSocket;
