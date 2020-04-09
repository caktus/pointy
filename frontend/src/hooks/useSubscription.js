import { useContext, useEffect } from "react";
import SocketContext from '../context/socketContext';

const useSubscription = eventKey => {
    const socket = useContext(SocketContext);
    const [data, setData] = useState();

    const subscribe = () => {
        if (eventKey) {
            socket.on(eventKey, setData);
        }
    };

    const unsubscribe = () => {
        if (eventKey) {
            socket.removeListener(eventKey, setData);
        }
    };

    useEffect(() => {
        subscribe();

        return unsubscribe;
    }, [eventKey]);

    return { data, socket, unsubscribe, subscribe };
};

export default useSubscription;
