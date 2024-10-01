"use client";
import { useRef, useState, useEffect } from "react";
import styles from "../header/assets/styles/GCSHeader.module.css";
import miniWidgetStyles from "./assets/styles/minWidget.module.css";
import { useHeaderProvider } from "../header/useHeaderContext";


function MiniWidget(props) {
    const {state, updateState} = useHeaderProvider();

    return (<mini-widget-icon class={styles['margin-right-1'] + " " + miniWidgetStyles['min-widget']}>
        {props.icon}
    </mini-widget-icon>)
}

export {MiniWidget}