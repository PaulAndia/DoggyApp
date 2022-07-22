import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogDetails, clearDetails } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { NavBar } from '../NavBar/NavBar';
import styles from "./Details.module.css"

export function Details() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const dogDetail = useSelector(state => state.details)

    useEffect(() => {
        dispatch(getDogDetails(id));
        return () => {
            dispatch(clearDetails())
        }
    }, [dispatch, id])


    return (
        <>
        <NavBar/>
        <div className={styles.container}>
        { dogDetail.length > 0 ?
            (dogDetail.map(d => (
                <div key={d.id}>
                    <div className={`${styles.face} ${styles.front}`}>
                        <img src={d.image} alt={d.name} 
                            width={165} height={190}
                            onError={e => {
                                e.target.onerror = null;
                                e.target.src = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ce8b1e76965389.5c7945b0cffef.gif";    
                            }}
                        />
                            <h3>{d.name.toUpperCase()}</h3>
                    </div>
                    <div className={`${styles.face} ${styles.back}`}>
                            <h3>{d.name.toUpperCase()}</h3>
                            <p><strong><u>Temperaments:</u></strong> {d.temperaments} Kg.</p>
                            <p><strong><u>Weight:</u></strong> {d.weight} Kg.</p>
                            <p><strong><u>Height:</u></strong> {d.height} cm.</p>
                            <p><strong><u>Years:</u></strong> {d.years}</p>
                    </div>
                </div>
            )
            )): <Loading/>}
    </div>
    </>
    )
}