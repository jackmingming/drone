"use client";
import { useContext, createContext, useRef } from "react";
import SocketIoClient from "../utilities/socket";


const socketIoContext = createContext();
let existedClient = undefined;

export function ProvideSocketIoClient({ children }) {
  const client = useProvideSocketIoClient();

  return (
    <socketIoContext.Provider value={client}>
      {children}
    </socketIoContext.Provider>
  );
}
export const useSocketIoClient = () => {
  return useContext(socketIoContext);
};
function useProvideSocketIoClient() {
   const config = {
    url: "http://localhost:8090/gcs-services"
  };
  //const client = new SocketIoClient(config);

  if(!existedClient) {
    existedClient = new SocketIoClient(config);

    existedClient.on("connect", () => {
      console.log("[SOCKET.IO] Client connected");
    });
    existedClient.on("disconnect", () => {
      console.log('[SOCKET.IO] Client disconnected')
    });
  }

  return existedClient;
}