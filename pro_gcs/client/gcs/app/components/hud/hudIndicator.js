"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { HUD } from "./components/hud";
import _ from 'lodash';
import memoize from "fast-memoize";
import { useSocketIoClient } from "@/app/contexts/use-socket-io";

import styles from "./styles/droneHud.module.css";

let canvas = undefined;
let hud = undefined;
let preControllerData = undefined;

function HudIndicator(props) {
    const client = useSocketIoClient();
   
    const onHudData = useCallback(memoize((controllerData) => {
        if(_.isObject(preControllerData)) {
            if(_.isEqual(preControllerData, controllerData)) {
                return;
            } else {
                preControllerData = controllerData;
            }
        }
        if(preControllerData === undefined) preControllerData = controllerData;
        
        if(
            hud === undefined || 
            !_.isObject(controllerData) || 
            !_.isObject(controllerData.analogStickLeft) ||
            !_.isObject(controllerData.analogStickRight)) return;

        const pitch = controllerData.analogStickLeft.yPosition;
        const heading = controllerData.analogStickRight.xPosition;
        console.log('pitch: ', pitch)
        hud.data.pitch = pitch* (Math.PI / 180);
        hud.data.heading = heading* (Math.PI / 180);
    }),[]);
   
    useEffect(()=>{
        if(!hud) {
            //red: rgba(196, 12, 12, 1)
            // red shadow: rgba(107, 2, 2, 0.6)
            canvas = document.getElementById('hud');
            hud = new HUD(canvas);
            hud.start();
            //hud.setStyle({color: 'rgba(196, 12, 12, 1)', shadow: {color:'rgba(107, 2, 2, 0.6)'}});

            hud.data.roll = 0* (Math.PI / 180);
            hud.data.pitch = 0* (Math.PI / 180);
            hud.data.altitude = 500;
            // const test = {
            //     variables: {
            //         heading: (Math.random() * 1000) % 360,
            //         pitch: (Math.random() * 1000) % 90,
            //         roll: (Math.random() * 1000) % 180,

            //         speed: Math.random() * 1000,
            //         altitude: Math.random() * 1000,
            //         throtle: Math.random(),

            //         flightPitch: (Math.random() * 1000) % 90,
            //         flightHeading: (Math.random() * 1000) % 360,
            //     },
            
            //     start: () => {
            //         interval = setInterval(() => {
            //             hud.data.heading = test.variables.heading * (Math.PI / 180);
            //             hud.data.pitch = test.variables.pitch * (Math.PI / 180);
            //             hud.data.roll = test.variables.roll * (Math.PI / 180);

            //             hud.data.speed = test.variables.speed;
            //             hud.data.altitude = test.variables.altitude;
            //             hud.data.throtle = test.variables.throtle;

            //             hud.data.flight.hitch =
            //                 test.variables.flightPitch * (Math.PI / 180);
            //             hud.data.flight.heading =
            //                 test.variables.flightHeading * (Math.PI / 180);

            //             test.variables.heading += 0.05;
            //             if (test.variables.heading >= 360) test.variables.heading = 0;

            //             test.variables.pitch += 0.05;
            //             if (test.variables.pitch >= 90) test.variables.pitch = 0;

            //             test.variables.roll += 0.05;
            //             if (test.variables.roll >= 360) test.variables.roll = 0;

            //             test.variables.speed += 0.01;
            //             test.variables.altitude += 0.1;

            //             test.variables.throtle += 0.001;
            //             if (test.variables.throtle >= 1) test.variables.throtle = 0;

            //             test.variables.flightPitch += 0.05;
            //             if (test.variables.flightPitch >= 90)
            //                 test.variables.flightPitch = 0;

            //             test.variables.flightHeading += 0.05;
            //             if (test.variables.flightHeading >= 360)
            //                 test.variables.flightHeading = 0;
            //         }, 5);
            //     },
            //     stop: () => {
            //         clearInterval(interval);
            //     },
            //     gyro: () => {
            //         if (window.DeviceOrientationEvent) {
            //             // browser supports DeviceOrientation
            //             window.addEventListener(
            //                 'deviceorientation',
            //                 (event) => {
            //                     hud.data.pitch = event.beta * (Math.PI / 180) - 0.5 * Math.PI;
            //                     hud.data.roll = -event.gamma * (Math.PI / 180);
            //                     hud.data.heading = event.alpha * (Math.PI / 180);
            //                 },
            //                 true
            //             );
            //         }
            //     },
            // };
            client.send("GCS_REQUEST_CONTROLLER_SINGAL", JSON.stringify({eventId: 'controllerData'}));
            client.subscribe("GCS_GET_CONTROLLER_SINGAL", onHudData);
        }
    },[])
    
    return (<gcs-hub class={styles['gcs-hud']}>
       <canvas id="hud" className={styles['hud-container']}></canvas>
    </gcs-hub>)
}

export {HudIndicator}