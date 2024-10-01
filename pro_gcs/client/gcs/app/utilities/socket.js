"use client";
import io from "socket.io-client";
import { EventEmitter } from "events";

export default class SocketIoClient extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.socket = null;
    this._connect();
  }
  get connected() {
    return this.socket && this.socket.connected;
  }
  _connect() {
    const options = {
      autoConnect: true,
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
      withCredentials: true,
      extraHeaders: {
        "gcs-service-header": "gcs"
      }
    };
    this.socket = io(this.config.url, options);
    this.socket.on("connect", () => {
      this.emit("connect", this.socket);
    });
    this.socket.on("disconnect", (reason) => {
      this.emit("disconnect", reason);
    });
    this.socket.on("connect_error", (error) => {
      console.log(error);
    });
  }
  unsubscribe() {
    this.socket.disconnect();
  }
  subscribe(event, callback) {
    this.socket.on(event, callback);
  }
  send(event, data) {
    this.socket.emit(event, data);
  }
}