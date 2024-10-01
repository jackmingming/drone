"use client";
import { useRef, useState, useEffect } from "react";
import { useEchoWebSocket } from "@/app/contexts/echo-websocket";
import styles from "../header/assets/styles/GCSHeader.module.css";
import miniWidgetStyles from "./assets/styles/minWidget.module.css";
import { useHeaderProvider } from "../header/useHeaderContext";


function MiniWidget(props) {
    const {state, updateState} = useHeaderProvider();
    const listener = (event) => {
        try{
            if(props.info instanceof Object) {
                var data = JSON.parse(event.data);
                if(data.type === props.info.type) {
                    var updatedState = Object.assign(state, data);
                    updateState(updatedState);
                }
            }
        } catch(e) {
            console.warn('[Icon Status] error: ', e);
        }
    }
    const {sendMessage} = useEchoWebSocket(listener);

    useEffect(()=> {
        if(props.info) {
            try{
                var message = JSON.stringify(props.info);
                sendMessage(message);
            } catch(e) {
                console.warn('['+props.info.type+'] status error: ', e)
            }
        }
    }, [props.info]);

    return (<mini-widget-icon class={styles['margin-right-1'] + " " + miniWidgetStyles['min-widget']}>
        {props.icon}
    </mini-widget-icon>)
}

export {MiniWidget}