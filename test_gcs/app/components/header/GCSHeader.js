"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./assets/styles/GCSHeader.module.css";

import { DroneAction } from "./components/droneAction";


function GCSHeader(props) {
    
    return (<gcs-header class={styles.headerContainer}>
        <DroneAction/>
    </gcs-header>)
}

export {GCSHeader}