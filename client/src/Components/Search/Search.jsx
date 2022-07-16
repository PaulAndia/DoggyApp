import {useState} from 'react';
import { useHistory, } from 'react-router-dom';

export function Search() {
    const [searchName, setSearchName] = useState("");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchName && searchName.length > 0){
            history.push(`dogs?name=${searchName}`)
            setSearchName("")
        }else{
            alert("please write a name");
        }
    }

    const handleInputChange = (e) => {
        setSearchName(e.target.value);  
    }

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={searchName}
                    onChange={ handleInputChange}
                    placeholder="Search dog..."
                    />
                        <button type='submit'>
                            Search
                        </button>
                </form>
            </div>
        )
}