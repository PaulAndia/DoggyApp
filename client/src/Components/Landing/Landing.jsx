import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"
import land from "../Images/land.jpg"

export function Landing() {
    return (
        <div className={styles.cover}>
                <img src={land} alt="landing" width="100%"/>
            <Link to="/home">
                <button>
                    START
                </button>
            </Link>
        </div>
    )
}
