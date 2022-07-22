import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavBar } from '../NavBar/NavBar';
import styles from './Temperaments.module.css'
import { getTemperaments } from '../../Redux/Actions';

export function Temperaments() {
    const dispatch = useDispatch();
    const temps = useSelector(state => state.temps);

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    return (
        <>
            <NavBar/>
            <div className={styles.container}>
                <ul className={styles.grid}>
                    {temps.map(t => (
                        <li className={styles.li}>
                            {`${t.name[0].toUpperCase()}${t.name.substring(1)}`}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
