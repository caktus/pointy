// Socket config
export const BASE_SOCKET_URL = `${process.env.REACT_APP_WS_HOST_ADDRESS}/ws/pointy`;
export const MAX_RECONNECT_ATTEMPTS = 100;
export const RECONNECT_ATTEMPT_INVERVAL = 100; // in ms
export const LOGGING_ENABLED = process.env.REACT_APP_LOGGING;
