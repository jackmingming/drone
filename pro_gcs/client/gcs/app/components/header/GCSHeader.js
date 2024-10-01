"use client";
import { useRef, useState, useEffect } from "react";
import { useSocketIoClient } from "@/app/contexts/use-socket-io";
import styles from "./assets/styles/GCSHeader.module.css";

import { DroneAction } from "./components/droneAction";

function GCSHeader(props) {
    // const [msgReceived, setMsgReceived] = useState("");
    // const client = useSocketIoClient();


    return (<gcs-header class={styles.headerContainer}>
        <DroneAction/>
    </gcs-header>)
}

export {GCSHeader}