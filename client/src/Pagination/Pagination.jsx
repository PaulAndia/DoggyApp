import styles from "./Pagination.module.css"

export function Pagination({fullDogs, dogsPerPage, page, changePage}) {
    const nPages = Math.ceil(fullDogs.length/dogsPerPage) // --> 172/8
    const buttons = [];
    for (let i = 0; i < nPages; i++) buttons.push(i);
    return (
        <div>
            {buttons.map(e  => (
                <button 
                key={e}
                className={page === e+1 ? styles.currentPage : styles.buttonPage}
                onClick={() => changePage(e+1)}
                > {e+1}
                </button>
            ))}
        </div>
    )
}