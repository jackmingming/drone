"use client";
import * as log from 'loglevel';
import memoize from "fast-memoize";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Communication } from "@/app/api/communication";
import { useEchoWebSocket } from '@/app/contexts/echo-websocket';


function useController() {
    const URL_WEB_SOCKET = 'ws://localhost:8091';
    const type = 'STATUS_GCS_CONTROLLER';
    const [data, setData] = useState({});

    // const getMessage = useMemo(memoize((param) => (message) => {
    //     try {
    //         const parsedMessage = JSON.parse(message.data);
    //         setData(parsedMessage)
    //     } catch(e){
    //             log.warn('[Message] error: ', e);
    //     }
    // }),[data])

    const listener = (event) => {
        var data = JSON.parse(event.data);
        console.log('controller type: ', data.type)
        if(data.type === type) {
            console.log('controller data: ', data)
           setData(data);
        }
    }
    const {sendMessage} = useEchoWebSocket(listener);
  
    useEffect(()=> {
        // const ws = new Communication(URL_WEB_SOCKET);
        // ws.onOpenCallback(() => {
        //     ws.sendWsMessage(type, {});
        // })
      
        // ws.onMessage(getMessage);
        var message = JSON.stringify({type, content: {}});
        sendMessage(message);
    }, [sendMessage]);

    return useMemo(() => ({
        data
    }), [data])
}

export {useController}