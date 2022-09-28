import styles from "./Pagination.module.css"
import { GrPrevious, GrNext, BiLeftArrow, BiRightArrow } from 'react-icons/bi';

export function Pagination({fullDogs, dogsPerPage, page, changePage}) {
    const nPages = Math.ceil(fullDogs.length/dogsPerPage) // --> 172/8
    const buttons = [];
    for (let i = 0; i < nPages; i++) buttons.push(i);
    return (
        <div className={styles.cont}>
              <button 
            className={page === 1 ? styles.bOff : styles.bOn } 
            onClick = {() => changePage(page - 1)}
            disabled={page === 1 ? true:false}
            > <BiLeftArrow/></button>
            {buttons.map(e  => (
                <button 
                key={e}
                className={page === e+1 ? styles.currentPage : styles.buttonPage}
                onClick={() => changePage(e+1)}
                > {e+1}
                </button>
            ))}

            <button 
            className={page === buttons.length - 1 ? styles.bOff : styles.bOn } 
            onClick = {() => changePage(page + 1)}
            disabled={page === buttons.length ? true:false}
            > <BiRightArrow/></button>
        </div>
    )
}