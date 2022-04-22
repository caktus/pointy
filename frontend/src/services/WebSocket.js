import * as config from './config';

import logger from './Logger';

export const EVENT_TYPES = {
  'request_pointy_state': 'request_pointy_state',
  'pointy_state': 'pointy_state',
  'room_created': 'room_created',
  'user_disconnect': 'user_disconnect',

  'room_update': 'room_update',
  'join_room': 'join_room',
  'ticket_created': 'ticket_created',
  'vote': 'vote',
}

export class SocketManager {
  constructor(socket, onOpenCallback) {
    this.socket = socket
    this.reconnectAttempts = 0;

    this.socket.onopen = () => {
      logger('NEW CONNECTION opened')
      onOpenCallback(this)
      this.reconnectAttempts = 0;
      return true;
    };

    this.socket.onmessage = (e) => {
      this._handleNewMessage(e.data);
    };

    this.socket.onerror = (e) => {
      logger('SOCKET ERROR');
      logger(e.message);
    };

    this.socket.onclose = () => {
      logger('SOCKET CLOSES')
      if (this.reconnectAttempts < config.MAX_RECONNECT_ATTEMPTS) {
        let _timeout = setTimeout(() => {
          logger("ATTEMPTING RECONNECT, ", this.reconnectAttempts);
          this.connect(this.url, onOpenCallback);
        }, config.RECONNECT_ATTEMPT_INVERVAL);
      } else {
        logger(
          "Reached maxium reconnect attempts: ",
          config.MAX_RECONNECT_ATTEMPTS
        );
      }
    };
  }


  setUser(user) {
    window.onbeforeunload = () => {
      this.socket.send(JSON.stringify({ type: EVENT_TYPES.user_disconnect, message: { user } }))
    }
    this.user = user
  }

  _fallbackCallback(eventName) {
    logger(`Received "${eventName}" event, but no callback was registered for this event`)
  }

  close() {
    this.socket.close(1000, "It's over. I just...can't anymore...")
  }

  subscribe(eventName, callback) {
    logger('[subscribe]', eventName)
    const fallback = () => this._fallbackCallback(eventName)
    this.callbacks = {
      ...this.callbacks,
      [eventName]: callback || fallback
    };
  }

  publish(eventName, data) {
    logger('[publish]', eventName)
    const msg = { type: eventName, message: data };
    this.socket.send(JSON.stringify(msg));
  }

  _handleNewMessage(data) {
    const { type, message } = JSON.parse(data);
    logger('[receive]', type, ': ', message)
    if (!this.callbacks[EVENT_TYPES[type]]) {
      logger(`WebSocket instance recieved unhandled event type "${type}"`);
    } else {
      this.callbacks[EVENT_TYPES[type]](message);
    }
  }

  getState() {
    return this.socket.readyState;
  }
}