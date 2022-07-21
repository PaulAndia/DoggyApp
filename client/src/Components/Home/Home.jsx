import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDogs, clearDogs, getTemperaments} from '../../Redux/Actions';
import styles from './Home.module.css'
import { Pagination } from '../../Pagination/Pagination';
import { CardsHome } from '../CardsHome/CardsHome';
import { Filters } from '../Filters/Filters';
import { NavBar } from '../NavBar/NavBar';
import { Loading } from '../Loading/Loading';

export function Home() {
    const dispatch = useDispatch();
    let fullDogs = useSelector(state => state.allDogs);
    const error = useSelector(state => state.error);
    
    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getAllDogs())
        return () => {
                dispatch(clearDogs());
            }
    }, [dispatch])

    // ----dogsPerPage
    const dogsPerPage = 8;
    const [page, setPage] = useState(1);
    const initialIndex = (page*dogsPerPage) - dogsPerPage;
    const finalIndex = page*dogsPerPage;
    const dogsShown = fullDogs.slice(initialIndex, finalIndex)

    useEffect(() => {
        setPage(1)
    }, [fullDogs])

    function changePage(n) {
        return setPage(n)
    }

    // -----dogsPerPage

    const backHome = () => {
        dispatch(clearDogs())
        dispatch(getAllDogs())
    }

    return (
        <>
        <div className={styles.head}>
            <NavBar/>
            <div className={styles.filt}>
                <Filters/>
            </div>
        </div>
        <div className={styles.container}>
        
            { error.length === 0 ?
                (fullDogs.length > 0  ? 
                <CardsHome dogsShown={dogsShown}/> : <Loading/>): 
                    <div>
                        <p>{error}</p>
                        <button onClick={backHome}>GO BACK</button>
                    </div>
            }
        </div>
        <div className={styles.pagfoot}>
            <Pagination fullDogs={fullDogs} dogsPerPage={dogsPerPage} page={page} changePage={changePage}/>
        </div>
        </>
    )
}