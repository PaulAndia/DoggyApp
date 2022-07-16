import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS"; // all dogs
export const GET_DOG_DETAILS = "GET_DOG_DETAILS"; 
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const MSG_ERROR = "MSG_ERROR";
export const CLEAR_DOGS = "CLEAR_DOGS";
export const POST_DOG = "POST_DOG";
export const GET_TEMPS = "GET_TEMPS";
export const CLEAR_SEARCH = "CLEAR_SEARCH";


export const getAllDogs = () => {
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/dogs");
            const dogs = response.data; // ---> [{}. {},...]
            return dispatch({
                type: GET_ALL_DOGS,
                payload: dogs
            })
        } catch (error) {
            console.log(error);
        }
    }
}



export const getDogDetails = (id) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`)
            const dog = response.data; // --> {}
            return dispatch({
                type: GET_DOG_DETAILS,
                payload: dog
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const clearDetails = () => {
    return {
        type: CLEAR_DETAILS,
        payload: []
    }
}

export const getDogByName = (name) => {
    return async function(dispatch){
        try {
            if(name){
                const responseName = await axios.get(`http://localhost:3001/dogs?name=${name}`);
                const dogFound = responseName.data; // --> [{}, {}]
                    return dispatch({
                        type: GET_DOG_NAME,
                        payload: dogFound
                    })
            }
        } catch (error) {
            return dispatch({
                type: MSG_ERROR,
                payload: ["DOG NOT FOUND"]
            })
        }
    }
}


export const clearDogs = () => {
    return {
        type: CLEAR_DOGS,
        payload: []
    }
}

export const postDog = (formData) => {
    return async function(dispatch){
        await axios.post('http://localhost:3001/dog', formData);
        return dispatch({type: POST_DOG})
    }
}

export const getTemperaments = () => {
    return async function(dispatch){
        try {
            const resTemps = await axios.get("http://localhost:3001/temperaments");
            const temps = resTemps.data;
            return dispatch({
                type: GET_TEMPS,
                payload: temps
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH,
    }
}