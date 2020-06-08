import * as config from './config';

export const EVENT_TYPES = {
  'request_pointy_state': 'request_pointy_state',
  'pointy_state': 'pointy_state',
  'room_created': 'room_created',
  'user_disconnect': 'user_disconnect',

  'room_update': 'room_update',
  'join_room': 'join_room',
  'ticket_created': 'ticket_created',
  'ticket_cancelled': 'ticket_cancelled',
  'vote': 'vote',
}

class WebSocketService {
  static instance = null;
  callbacks = {};
  reconnectAttempts = 0;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.url = "";
    this.socket = null;
    this.user = null;

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
    this.reconnectAttempts = this.reconnectAttempts + 1;
    this.url = url;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      return true;
    };

    this.socket.onmessage = (e) => {
      this._handleNewMessage(e.data);
    };

    this.socket.onerror = (e) => {
      console.warn('SOCKET ERROR');
      console.warn(e.message);
    };

    this.socket.onclose = () => {
      if (this.reconnectAttempts < config.MAX_RECONNECT_ATTEMPTS) {
        let timeout = setTimeout(() => {
          this.connect(this.url);
        }, config.RECONNECT_ATTEMPT_INVERVAL);
      } else {
        console.warn(
          "Reached maxium reconnect attempts: ",
          config.MAX_RECONNECT_ATTEMPTS
        );
      }
    };
  }

  setUser(user) {
    window.onbeforeunload = () => {
      this.socket.send(JSON.stringify({ type: EVENT_TYPES.user_disconnect, message: { user }}))
    }
    this.user = user
  }

  _fallbackCallback(eventName) {
    console.warn(`Received "${eventName}" event, but no callback was registered for this event`)
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
    const msg = { type: eventName, message: data };
    this.socket.send(JSON.stringify(msg));
  }

  _handleNewMessage(data) {
    const { type, message } = JSON.parse(data);
    if (!this.callbacks[EVENT_TYPES[type]]) {
      console.warn(`WebSocket instance recieved unhandled event type "${type}"`);
    } else {
       this.callbacks[EVENT_TYPES[type]](message);
    }
  }

  getState() {
    return this.socket.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socket;
    const recursion = this.waitForSocketConnection;
    this.reconnectAttempts++;
    setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        callback()
        return
      } else if (this.reconnectAttempts < 1000) {
          recursion(callback);
        }
    }, 100);
  }
}


const WebSocketConnection = WebSocketService.getInstance();

export default WebSocketConnection;
