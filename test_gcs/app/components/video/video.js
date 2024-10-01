"use client";
import { useRef, useState, useEffect } from "react";
import { Communication } from "../../api/communication";
import { useEchoWebSocket } from "../../contexts/echo-websocket";
import * as log from 'loglevel';

import styles from "./assets/styles/video.module.css";


const URL_WEB_SOCKET = 'ws://localhost:8090';

function Video(props) {
        const videoRef = useRef(null);
        let canvas = undefined;
        let context = undefined;
        const type = 'GCS_REQUEST_TO_STREAM_VIDEO';
            
        const gotRemoteStream = (data) => {
                    try {
                        if(canvas === undefined) canvas = document.getElementById('videostream');
                        if(context === undefined) context = canvas.getContext('2d');
                        let imageObj = new Image();

                        imageObj.src = "data:image/jpeg;base64,"+data;
                        imageObj.onload = function(){
                                context.height = imageObj.height;
                                context.width = imageObj.width;                      
                                context.drawImage(imageObj,0,0,context.width,context.height);
                        
                        };
                } catch(e){
                        console.warn('[Video stream] error: ', e)
                 }
            };
        const listener = (event) => {
                try {
                        console.log('event: ', event);
                        var streamData = JSON.parse(event.data);
                      
                        if(streamData.type === type) {
                                gotRemoteStream(streamData.content);
                        }
                } catch(e) {
                        console.warn('[STREAM_VIDEO] error: ', e);
                }
        }
        const {sendMessage} = useEchoWebSocket(listener);
  
        useEffect(()=>{
                sendMessage(JSON.stringify({type: type, content: {}}));
                console.log('test: ');
        }, [sendMessage]);

        return (<gcs-video-container class={styles['gcs-video-container']}>
                <canvas className="shadow" id="videostream" width="1024" height="600">
                </canvas>
                {props.children}
        </gcs-video-container>);
}

export {Video}