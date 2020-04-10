import * as config from './config';

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
  }

  connect(url) {
    this.reconnectAttempts = this.reconnectAttempts + 1;
    this.url = url;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket open");
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

  subscribe(eventName, callback) {
    this.callbacks = {
      ...this.callbacks,
      [eventName]: callback,
    };
  }

  publish(eventName, data) {
    console.log('publishing: ', eventName, data)
    const msg = { type: eventName, ...data };
    this.socket.send(JSON.stringify(msg));
  }

  _handleNewMessage(data) {
    console.log("new message recieved: ", data);
    // const { type, body } = data.event;
    // switch () {
    //   case "user_joined":
    //     this.callbacks["user_joined"](data);
    //     break;

    //   default:
    //     console.log(`WebSocket instance recieved unhandled event "${event}"`);
    //     break;
    // }
  }

  getState() {
    return this.socket.readyState;
  }

  waitForSocketConnection() {
    const socket = this.socket;
    const recursion = this.waitForSocketConnection;
    let timeout = setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        console.log("Connection is made");
        return
      } else {
        console.log("wait for connection...");
        recursion();
      }
    }, 1);
    return true
  }
}


const WebSocketConnection = WebSocketService.getInstance();

export default WebSocketConnection;
