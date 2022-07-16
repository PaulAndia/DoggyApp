import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDogs, clearDogs} from '../../Redux/Actions';
import styles from './Home.module.css'
import { Search } from '../Search/Search';
import { Pagination } from '../../Pagination/Pagination';
import { CardsHome } from '../CardsHome/CardsHome';

export function Home() {
    const dispatch = useDispatch();
    let fullDogs = useSelector(state => state.allDogs);
    const error = useSelector(state => state.error);

    
    useEffect(() => {
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
    console.log(dogsShown)

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
        <Search/>
        <div>
            { error.length === 0 ?
                (fullDogs.length > 0  ? 
                <CardsHome dogsShown={dogsShown}/> : <p>Loading...</p>): 
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