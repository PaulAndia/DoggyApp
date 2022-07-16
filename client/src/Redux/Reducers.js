import {
    GET_ALL_DOGS, GET_DOG_DETAILS, CLEAR_DETAILS, 
    GET_DOG_NAME, MSG_ERROR, CLEAR_DOGS, POST_DOG, GET_TEMPS, CLEAR_SEARCH
} from './Actions';

const initialState = {
    allDogs: [],
    allDogsCopy: [],
    dogsName: [],
    dogsNameCopy: [],
    details: [],
    error: [],
    temps: [],
}

const rootReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                allDogsCopy: action.payload
            }
        case GET_DOG_DETAILS:
            return {
                ...state,
                details: [action.payload]
            }
        case CLEAR_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_DOG_NAME:
            return {
                ...state,
                allDogs: action.payload,
                // dogsAux: action.payload,
                error: [],
                dogsName: action.payload,
                dogsNameCopy: action.payload,
            }
        case MSG_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                // dogsAux: action.payload,
                dogsName: action.payload,
                error: [],
            }
        case POST_DOG:
            return {
                ...state,
            }
        case GET_TEMPS:
            return{
                ...state,
                temps: action.payload
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                allDogsCopy: state.allDogs,
                dogsNameCopy: state.dogsName

            }

        default: 
        return {...state}
    }
}

export default rootReducer;