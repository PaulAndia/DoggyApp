import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getDogByName, clearDogs, getAllDogs, clearSearch } from '../../Redux/Actions';
import { useLocation, Link } from 'react-router-dom';
import { CardsHome } from '../CardsHome/CardsHome';
import { Pagination } from '../../Pagination/Pagination';
import styles from "./SearchedDogs.module.css"
import { Search } from '../Search/Search';

export function SearchedDogs() {
     const query = new URLSearchParams(useLocation().search);
     const name = query.get('name');
     const dispatch = useDispatch();
     let dogsName = useSelector(state => state.dogsName);
     const error = useSelector(state => state.error);

     useEffect(() => {
        dispatch(getDogByName(name))
        return () => {
                dispatch(clearDogs());
                dispatch(clearSearch())
            }
    }, [dispatch, name])


    // ----dogsPerPage
    const dogsPerPage = 8;
    const [page, setPage] = useState(1);
    const initialIndex = (page*dogsPerPage) - dogsPerPage;
    const finalIndex = page*dogsPerPage;
    const dogsShown = dogsName.slice(initialIndex, finalIndex)
    console.log(dogsShown)

    useEffect(() => {
        setPage(1)
    }, [dogsName])

    function changePage(n) {
        return setPage(n)
    }
    // -----dogsPerPage


     return (
        <>
        <Search/>
        <div>
             {error.length === 0 ?
                (dogsName.length > 0  ? 
                <CardsHome dogsShown={dogsShown}/> : <p>Loading...</p>): 
                    <div>
                        <p>{error}</p>
                        <Link to = "/home">
                            <button>GO HOME</button>
                        </Link>
                    </div>
            }
            <div className={styles.pagfoot}>
                <Pagination fullDogs={dogsName} dogsPerPage={dogsPerPage} page={page} changePage={changePage}/>
            </div>
        </div>
        </>
    )
}