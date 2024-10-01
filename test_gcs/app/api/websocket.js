"use client";
import { useEffect, useState } from 'react';

const keepAlive = (websocket, interval) => {
  setTimeout(() => {
    websocket.send(
      JSON.stringify({
        method: 'ping',
      }),
    );
    keepAlive(websocket, interval);
  }, interval);
};

export const Websocket = ({
  url,
  onMessage,
  onOpen,
  keepAliveInterval,
  onClose,
}) => {
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    try{
        const websocket = new WebSocket(url);
        websocket.onmessage = (event) => {
          onMessage(event, websocket);
        };
        if (onClose) {
          websocket.onclose = (event) => {
            onClose(event, websocket);
          };
        }
    
        websocket.onopen = (event) => {
          setWebsocket(websocket);
          onOpen(event, websocket);
          if (keepAliveInterval) {
            keepAlive(websocket, keepAliveInterval);
          }
        };
        websocket.onerror = (event) => {
            throw new Error('[Websocket] connection error: ', event);
        }
    } catch(e) {
        console.warn('[Websocket] connection error: ', e);
    }
  }, []);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event) => {
        onMessage(event, websocket);
      };
    }
  }, [onMessage]);

  return null;
};