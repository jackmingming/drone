"use client";
import { useRef, useState, useEffect } from "react";

import styles from "../assets/styles/GCSHeader.module.css";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { BatteryStatus } from "../../miniWidget/batteryStatus/batteryStatus";
import {SignalStatus} from "../../miniWidget/signalStatus/signalStatus";

import { HeaderProvider, useHeaderProvider } from "../useHeaderContext";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { MiniWidget } from "../../miniWidget/miniWidget";



const DroneAction = HeaderProvider((props) =>{
    const {state} = useHeaderProvider();

    return (
        <gcs-drone-action class={styles['gcs-drone-action']}>
       {/* <MiniWidget icon={<FlightTakeoffIcon state={state}/>} info={{type: 'STATUS_TAKE_OFF',content: {}}}/> */}
       <MiniWidget icon={<BatteryStatus 
        state={state} 
        chargingMode={'implementation'} 
        batteryValue={50} 
        typeIcon={<AirplanemodeActiveIcon/>}/>} 
        info={{type: 'STATUS_VEHICLE_BATTERY',content: {}}}/>
        <MiniWidget icon={<BatteryStatus 
        state={state} 
        chargingMode={'implementation'} 
        batteryValue={50} 
        typeIcon={<SportsEsportsIcon/>}/>}
        info={{type: 'STATUS_GCS_BATTERY',content: {}}}/>
        <MiniWidget icon={<SignalStatus 
        state={state} 
        typeIcon={<AirplanemodeActiveIcon/>}
        signalLevel={50}/>} 
        info={{type: 'STATUS_CONNECTION_SIGNAL',content: {}}}/>
    </gcs-drone-action>)
})

export {DroneAction}