import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import useSocket from '../hooks/useSocket';
import SocketContext from '../context/socketContext';

function ConnectedRoute({ children, ...props}) {
    const socket = useContext(SocketContext)

    console.log("socket state in ConnectedRoute: ", socket.getState());
    if (socket.getState() !== WebSocket.OPEN) return <Redirect to="/" />;

    return <Route {...props}>{children}</Route>
}

export default ConnectedRoute;
