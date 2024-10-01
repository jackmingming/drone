"use client";
import { useRef, useState, useEffect } from "react";
import styles from "../assets/styles/minWidget.module.css";

import SignalCellularConnectedNoInternet0BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet0Bar';
import SignalCellular1BarIcon from '@mui/icons-material/SignalCellular1Bar';
import SignalCellular2BarIcon from '@mui/icons-material/SignalCellular2Bar';
import SignalCellular3BarIcon from '@mui/icons-material/SignalCellular3Bar';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';


function SignalStatus(props) {
    const [typeIcon, setTypeIcon] = useState(undefined);
    const [signalIcon, setSignalIcon] = useState(undefined);

    const computeIcons = (opt) => {
        const icons = {
            isAlertLevel: <SignalCellularConnectedNoInternet0BarIcon/>,
            isTweentyFiveLevel: <SignalCellular1BarIcon/>,
            isFiftyLevel: <SignalCellular2BarIcon/>,
            isSeventyFiveLevel: <SignalCellular3BarIcon/>,
            isFullLevel: <SignalCellular4BarIcon/>
        }

        return icons[opt.signalLevel]
    }

    const computeSignalIconByValue = (opt) => {

        let signalLevel = '';

        if(opt.singalValue > 5 && opt.singalValue <=25) {
            signalLevel = 'isTweentyFiveLevel';
        } else if (opt.signalLevel > 25 && opt.signalLevel <=50) {
            signalLevel = 'isFiftyLevel';
        } else if (opt.batteryValue > 50 && opt.batteryValue <=75)  {
            signalLevel = 'isSeventyFiveLevel';
        } else if (opt.batteryValue >= 75) {
            signalLevel = 'isFullLevel';
        } else if (opt.batteryValue <=5) {
            signalLevel = 'isAlertLevel';
        }
        const icon = computeIcons({
            signalLevel: signalLevel
        })

        return icon;
    };

    useEffect(()=> {
        const signalIcon = computeSignalIconByValue({
            signalLevel: props.signalLevel
        });
        setTypeIcon(props.typeIcon);
        setSignalIcon(signalIcon);
    }, [props.signalIcon, props.typeIcon]);

    return (<signal-status class={styles['min-widget-status']}>
        <div>{typeIcon}</div>
         <div>{signalIcon}</div>
    </signal-status>)
}

export {SignalStatus}