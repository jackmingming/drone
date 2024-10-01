"use client";
import { useRef, useState, useEffect } from "react";
import { useEchoWebSocket } from "@/app/contexts/echo-websocket";
import styles from "../assets/styles/minWidget.module.css";

import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

//import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

function BatteryStatus(props) {
    const [typeIcon, setTypeIcon] = useState(undefined);
    const [batteryIcon, setBatteryIcon] = useState(undefined);
    const [batteryPercentage, setBatteryPercentage] = useState(0);

    const computeIcons = (opt) => {
        const icons = {
            changing: {
                isAlertLevel: <BatteryAlertIcon/>,
                isTweentyLevel: <Battery20Icon/>,
                isThirdyLevel: <Battery30Icon/>,
                isFiftyLevel: <Battery50Icon/>,
                isSixtyLevel: <Battery60Icon/>,
                isEightyLevel: <Battery80Icon/>,
                isNintyLevel: <Battery90Icon/>,
                isFullLevel: <BatteryFullIcon/>
            },
            implementation: {
                isAlertLevel: <BatteryAlertIcon/>,
                isTweentyLevel: <BatteryCharging20Icon/>,
                isThirdyLevel: <BatteryCharging30Icon/>,
                isFiftyLevel: <BatteryCharging50Icon/>,
                isSixtyLevel: <BatteryCharging60Icon/>,
                isEightyLevel: <BatteryCharging80Icon/>,
                isNintyLevel: <BatteryCharging90Icon/>,
                isFullLevel: <BatteryChargingFullIcon/>
            }
        }

        return icons[opt.chargingMode][opt.batteryLevel]
    }

    const computeBatteryIconByValue = (opt) => {

        let batteryLevel = '';

        if(opt.batteryValue >= 10 && opt.batteryValue <=20) {
            batteryLevel = 'isTweentyLevel';
        } else if (opt.batteryValue > 20 && opt.batteryValue <=30) {
            batteryLevel = 'isThirdyLevel';
        } else if (opt.batteryValue > 30 && opt.batteryValue <=50)  {
            batteryLevel = 'isFiftyLevel';
        } else if (opt.batteryValue > 50 && opt.batteryValue <=60) {
            batteryLevel = 'isSixtyLevel';
        } else if (opt.batteryValue > 60 && opt.batteryValue <=80) {
            batteryLevel = 'isEightyLevel';
        } else if (opt.batteryValue > 80 && opt.batteryValue <=90) {
            batteryLevel = 'isNintyLevel';
        } else if (opt.batteryValue > 90 && opt.batteryValue <= 99) {
            batteryLevel = 'isFullLevel';
        } else if (opt.batteryValue < 10) {
            batteryLevel = 'isAlertLevel';
        }
        const icon = computeIcons({
            chargingMode: opt.chargingMode,
            batteryLevel: batteryLevel
        })

        return icon;
    };
    const computeBatteryPercentage = (opt) => {
        return opt.batteryValue + '%';
    };

    useEffect(()=> {
        const batteryPercentage = computeBatteryPercentage({
            batteryValue: props.batteryValue
        });
        const batteryIcon = computeBatteryIconByValue({
            chargingMode: props.chargingMode,
            batteryValue: props.batteryValue
        });

        setTypeIcon(props.typeIcon);
        setBatteryIcon(batteryIcon);
        setBatteryPercentage(batteryPercentage);
    }, [props.chargingMode, props.typeIcon, props.batteryValue]);

    return (<battery-status class={styles['min-widget-status']}>
         <div>{typeIcon}</div>
         <div>{batteryIcon}</div>
         <div>{batteryPercentage}</div>
    </battery-status>)
}

export {BatteryStatus}