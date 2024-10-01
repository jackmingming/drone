"use client";
import { GCSHeader } from "../header/GCSHeader";
import styles from "./assets/styles/container.module.css";
import { HudIndicator } from "../hud/hudIndicator";

function GCSContainer(props) {

        return (<gcs-main-container class={styles['gcs-main-container']}>
                        <GCSHeader/>
                        <HudIndicator/>
                        {props.children}
                </gcs-main-container>)
}

export {GCSContainer}