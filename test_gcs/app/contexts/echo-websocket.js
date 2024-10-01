"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Websocket } from '../api/websocket';

const URL_WEB_SOCKET = 'ws://localhost:8090';

export const EchoWebSocketContext = createContext([
  () => {},
  () => {},
]);

export const EchoWebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState(null);
  const [listeners, setListeners] = useState({});

  const addListener = (fn, filter = 'any') => {
    setListeners(currentListeners => {
      console.log(currentListeners);
      return { ...currentListeners, [filter]: [...(currentListeners[filter] || []), fn] };
    });
  };

  const sendMessage = (message) => {
    if (webSocket) {
      webSocket.send(message);
    }
  };

  const onMessage = (event) => {
    const { data } = event;
    if (listeners[data]) {
      listeners[data].forEach(listener => listener(event));
    }

    if (listeners.any) {
      listeners.any.forEach(listener => listener(event));
    }
  };
  return (
    <EchoWebSocketContext.Provider value={[addListener, sendMessage]}>
      <Websocket
        url={URL_WEB_SOCKET}
        onOpen={(_event, socket) => {
          setWebSocket(socket);
          console.log('Connected to websocket');
        }}
        onMessage={onMessage}
      />
      {children}
    </EchoWebSocketContext.Provider>
  );
};

export const useEchoWebSocket = (listener, filter = 'any') => {
  const [addListener, sendMessage] = useContext(EchoWebSocketContext);
  useEffect(() => {
    if (listener) {
      addListener(listener, filter);
    }
  }, []);

  return { sendMessage };
};