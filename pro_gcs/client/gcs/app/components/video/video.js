"use client";
import { useRef, useEffect, useCallback } from "react";
import memoize from "fast-memoize";
import { useSocketIoClient } from "@/app/contexts/use-socket-io";
import Styles from "./styles/video.module.css"


function Video(props) {
    const videoRef = useRef();
    const client = useSocketIoClient();


    const handleIncomingMessage = useCallback(memoize((data) => {
        let context = videoRef.current.getContext('2d');
        let imageObj = new Image();

        imageObj.src = "data:image/jpeg;base64,"+data;
        imageObj.width = 1024;
        imageObj.height = 600;
        imageObj.onload = function(){
                context.height = imageObj.height;
                context.width = imageObj.width;                      
                context.drawImage(imageObj,0,0,context.width,context.height);
        
                };
    }), [])

    useEffect(()=>{
            client.send("GCS_REQUEST_VIDEO_STREAM", JSON.stringify({eventId: 'streamVideo'}));
            client.subscribe("GCS_SERVER_STREAMING_VIDEO", handleIncomingMessage);
    }, []);

    return (<div className={Styles['gcs-video-contrainer']}>
         <canvas id="videoCanvas" ref={videoRef}  width="1024" height="600"></canvas>
    </div>)
}

export {Video}