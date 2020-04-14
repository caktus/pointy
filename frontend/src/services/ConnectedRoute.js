import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';

// Context
import HomeSocketContext from '../context/HomeSocketContext';
import SessionSocketContext from '../context/SessionSocketContext';

function ConnectedRoute({ socket, children, ...props}) {
    const homeSocket = useContext(HomeSocketContext)
    const sessionSocket = useContext(SessionSocketContext)


    if (socket === 'home' && homeSocket && homeSocket.getState() !== WebSocket.OPEN) return <Redirect to="/" />;
    if (socket === 'session' && sessionSocket && sessionSocket.getState() !== WebSocket.OPEN) return <Redirect to="/" />;

    return <Route {...props}>{children}</Route>
}

export default ConnectedRoute;
