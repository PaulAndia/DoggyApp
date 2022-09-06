import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import { filterAlphabetically, filterWeight, filterBySource, filterTemps } from '../../Redux/Actions';
import styles from "./Filters.module.css"

export function Filters() {
    const dispatch = useDispatch();
    const tempes = useSelector(state => state.temps);
    const [filtersState, setfiltersState] = useState({
        sort: "",
        filterCreated: "ALL",
        filterTemps: "ALL"
    })


    function filterSort(e){
        e.preventDefault();
        if(e.target.value === "A" || e.target.value === "Z"){
            dispatch(filterAlphabetically(e.target.value))
            setfiltersState({
                ...filtersState,
            sort: e.target.value
            })
        }
        else{
            dispatch(filterWeight(e.target.value))
            setfiltersState({
                ...filtersState,
            sort: e.target.value
            })
        }
    }

    function handleCreated(e){
        e.preventDefault();
        dispatch(filterBySource(e.target.value))
        setfiltersState({
            ...filtersState,
            filterCreated: e.target.value,      
            sort: "",
            filterTemps: "ALL"
        })
    }

    function handleTemps(e) {
        e.preventDefault();
        dispatch(filterTemps(e.target.value))
        setfiltersState({
            ...filtersState,
            filterTemps: e.target.value,
            sort: "",     
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.source}>
                <p>SHOW :</p> 
            <button value = {"ALL"} className={filtersState.filterCreated === "ALL" ? styles.cre : styles.normal} onClick={handleCreated}>ALL DOGS</button>
            <button value = {"API"} className={filtersState.filterCreated === "API" ? styles.cre : styles.normal} onClick={handleCreated}>API</button>
            <button value = {"CREATED"} className={filtersState.filterCreated === "CREATED" ? styles.cre : styles.normal} onClick={handleCreated}>CREATED</button>
            </div>

            <div className={styles.sort}>
                <p>FILTER :</p>
            <button value={"A"} className={filtersState.sort === "A" ? styles.current : styles.normal} onClick={filterSort}> SORT A-Z</button>
            <button value={"Z"} className={filtersState.sort === "Z" ? styles.current : styles.normal} onClick={filterSort}> SORT Z-A</button>
            <button value={"L"} className={filtersState.sort === "L" ? styles.current : styles.normal} onClick={filterSort}> LOW WEIGHT</button>
            <button value={"H"} className={filtersState.sort === "H" ? styles.current : styles.normal} onClick={filterSort}> HIGH WEIGHT</button>
            </div>

            <div className={styles.select}>
                <p>SELECT TEMPERAMENT:</p>
            <select  name="temps" id="Temps Filter" onChange={handleTemps} value={filtersState.filterTemps}>
                <option value="ALL">All temperaments</option>
                {tempes?.map(e =>
                    (<option key={e.id} value={e.name}>{e.name}</option>)
                    )}
            </select>
            </div>
            <br/>
        </div>
    )
}
