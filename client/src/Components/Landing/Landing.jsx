import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"
import land from "../Images/L12.jpg"

export function Landing() {
    return (
        <div className={styles.cover}>
                <img src={land} alt="landing"/>
            <Link to="/home">
                <div className={styles.wrap}>
                <button className={styles.button}>
                    START
                </button>
                </div>
                
            </Link>
        </div>
    )
}
