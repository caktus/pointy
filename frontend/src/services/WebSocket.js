import * as config from './config';

/**
 * Create an instance of a websocket connection
 * Add it to conext.
 * 
 * In components, const { subscribe, publish } = useSocket('/path') [which just does socketInstance('/path')]
 * subscribe('', data => { the call back });
 * publish('', data) where data is {}
 * 
 * 
 * so:
 * function useSocket(path) {
 *  
 *  subscribe(eventName, callback()) {
 *    socketInstance.subscribe(eventName, callback())
 *  }
 *  
 *  publish(eventName, data) {
 *  
 *  }
 * }
 */

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
    console.log("attempting reoconnect: ", this.reconnectAttempts);
    this.url = url;
    this.reconnectAttempts = this.reconnectAttempts + 1;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket open");
      return "connected";
    };

    this.socket.onmessage = (e) => {
      this._handleNewMessage(e.data);
    };

    this.socket.onerror = (e) => {
      console.log(e.message);
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed. Attempting to reconnect.");
      if (this.reconnectAttempts <= config.MAX_RECONNECT_ATTEMPTS) {
        let timeout = setTimeout(() => {
          this.connect(this.url);
        }, config.RECONNECT_ATTEMPT_INVERVAL);
      } else {
        console.log(
          "Reached maxium reconnect attemps: ",
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
    const msg = { type: eventName, ...data };
    this.socket.send(JSON.stringify(msg));
  }

  _handleNewMessage(data) {
    const { event, body } = data.event;
    switch (event) {
      case "user_joined":
        this.callbacks["user_joined"](body);
        break;

      default:
        console.log(`WebSocket instance recieved unhandled event "${event}"`);
        break;
    }
  }
}


const WebSocketConnection = WebSocketService.getInstance();

export default WebSocketConnection;


// class WebSocketService {
//   static instance = null;
//   callbacks = {};

//   static getInstance() {
//     if (!WebSocketService.instance) {
//       WebSocketService.instance = new WebSocketService();
//     }
//     return WebSocketService.instance;
//   }

//   constructor() {
//     this.socket = null;
//     this.path = null;
//   }

//   connect(path) {
//     this.path = path
//     const rootUrl = config.BASE_SOCKET_URL;
//     const url = rootUrl + path;
//     this.socket = new WebSocket(url);
    // this.socket.onopen = () => {
    //   console.log("WebSocket open");
    // };
    // this.socket.onmessage = (e) => {
    //   this.socketNewMessage(e.data);
    // };

    // this.socket.onerror = (e) => {
    //   console.log(e.message);
    // };
    // this.socket.onclose = () => {
    //   console.log("WebSocket closed. Attempting to reconnect.");
    //   this.connect();
    // };
//   }

//   socketNewMessage(data) {
//     const parsedData = JSON.parse(data);
//     const command = parsedData.command;
//     if (Object.keys(this.callbacks).length === 0) {
//       return;
//     }
//     if (command === "messages") {
//       this.callbacks[command](parsedData.messages);
//     }
//     if (command === "new_message") {
//       this.callbacks[command](parsedData.message);
//     }
//   }

//   initChatUser(username) {
//     this.sendMessage({ command: "init_chat", username: username });
//   }

//   fetchMessages(username) {
//     this.sendMessage({ command: "fetch_messages", username: username });
//   }

//   newChatMessage(message) {
//     this.sendMessage({
//       command: "new_message",
//       from: message.from,
//       text: message.text,
//     });
//   }

//   addCallbacks(messagesCallback, newMessageCallback) {
//     this.callbacks["messages"] = messagesCallback;
//     this.callbacks["new_message"] = newMessageCallback;
//   }

//   sendMessage(data) {
//     try {
//       this.socket.send(JSON.stringify({ ...data }));
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   state() {
//     return this.socket.readyState;
//   }

//   waitForSocketConnection(callback) {
//     const socket = this.socket;
//     const recursion = this.waitForSocketConnection;
//     setTimeout(function () {
//       if (socket.readyState === 1) {
//         console.log("Connection is made");
//         if (callback != null) {
//           callback();
//         }
//         return;
//       } else {
//         console.log("wait for connection...");
//         recursion(callback);
//       }
//     }, 1);
//   }
// }

// const WebSocketInstance = WebSocketService.getInstance();

// export default WebSocketInstance;
