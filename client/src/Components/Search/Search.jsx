import {useState} from 'react';
import { useHistory, } from 'react-router-dom';
import styles from "./Search.module.css"
import {FaSearch} from "react-icons/fa"
import Swal from 'sweetalert2'; 

export function Search() {
    const [searchName, setSearchName] = useState("");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchName && searchName.length > 0){
            history.push(`dogs?name=${searchName}`)
            setSearchName("")
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please insert a name!',
              })
        }
    }

    const handleInputChange = (e) => {
        setSearchName(e.target.value);  
    }

        return (
            <div className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                            <button className={styles.btn} type='submit'>
                                <FaSearch/>
                            </button>
                            <input
                            type="text"
                            value={searchName}
                            onChange={ handleInputChange}
                            placeholder="Search dog..."
                            />
                    </form>
            </div>
        )
}