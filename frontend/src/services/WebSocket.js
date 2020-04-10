import * as config from './config';

export const EVENT_TYPES = {
  REQUEST_POINTY_STATE: 'request_pointy_state',
  POINTY_STATE: 'pointy_state',
  ROOM_CREATED: 'room_created',

  ROOM_UPDATE: 'room_update',
  JOIN_ROOM: 'join_room',
}

class WebSocketService {
  static instance = null;
  callbacks = {};
  reconnectAttempts = 0;

  static getInstance() {
    console.log('------>>>> getInstance()')
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.url = "";
    this.socket = null;
    this.connect = this.connect.bind(this);
    this._fallbackCallback = this._fallbackCallback.bind(this);
    this.close = this.close.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.publish = this.publish.bind(this);
    this._handleNewMessage = this._handleNewMessage.bind(this);
    this.getState = this.getState.bind(this);
    this.waitForSocketConnection = this.waitForSocketConnection.bind(this);
  }

  connect(url) {
    console.log("------>>>> connect()");
    this.reconnectAttempts = this.reconnectAttempts + 1;
    this.url = url;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket open at: ",  url);
      this.reconnectAttempts = 0;
      return true;
    };

    this.socket.onmessage = (e) => {
      this._handleNewMessage(e.data);
    };

    this.socket.onerror = (e) => {
      console.log(e.message);
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed. Attempting to reconnect.");
      if (this.reconnectAttempts < config.MAX_RECONNECT_ATTEMPTS) {
        let timeout = setTimeout(() => {
          this.connect(this.url);
        }, config.RECONNECT_ATTEMPT_INVERVAL);
      } else {
        console.log(
          "Reached maxium reconnect attempts: ",
          config.MAX_RECONNECT_ATTEMPTS
        );
      }
    };
  }

  _fallbackCallback(eventName) {
    console.log(`Received "${eventName}" event, but no callback was provided`)
  }

  close() {
    this.socket.close(1000, "It's over. I just...can't anymore...")
  }

  subscribe(eventName, callback) {
    const fallback = () => this._fallbackCallback(eventName)
    this.callbacks = {
      ...this.callbacks,
      [eventName]: callback || fallback
    };
  }

  publish(eventName, data) {
    console.log('publishing: ', eventName, data)
    const msg = { type: eventName, ...data };
    this.socket.send(JSON.stringify(msg));
  }

  _handleNewMessage(data) {
    console.log("new message recieved: ", data);
    const { type, message } = data;
    if (!this.callbacks[EVENT_TYPES.REQUEST_POINTY_STATE]) {
      console.log(`WebSocket instance recieved unhandled event type "${type}"`);
    } else {
       this.callbacks[EVENT_TYPES.REQUEST_POINTY_STATE](message);
    }
  }

  getState() {
    return this.socket.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socket;
    const recursion = this.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        console.log("Connection is made");
        callback()
        return
      } else {
        console.log("wait for connection...");
        recursion(callback);
      }
    }, 1);
  }
}


const WebSocketConnection = WebSocketService.getInstance();

export default WebSocketConnection;
