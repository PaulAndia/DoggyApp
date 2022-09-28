import {
    GET_ALL_DOGS, GET_DOG_DETAILS, CLEAR_DETAILS, 
    GET_DOG_NAME, MSG_ERROR, CLEAR_DOGS, POST_DOG, GET_TEMPS, CLEAR_SEARCH,
    FILTER_ALPHABET, FILTER_WEIGHT, FILTER_SOURCE, FILTER_TEMP
} from './Actions';
import Swal from 'sweetalert2'; 

const initialState = {
    allDogs: [],
    allDogsCopy: [],
    dogsName: [],
    dogsNameCopy: [],
    details: [],
    error: [],
    errorDB: [],
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
                // allDogs: action.payload,
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
        case FILTER_ALPHABET:
            const orderAsc = (x,y) => {
                return (x.name.toLowerCase().localeCompare(y.name.toLowerCase()));
            }
            const orderDes = (x,y) => {
                return (y.name.toLowerCase().localeCompare(x.name.toLowerCase()));
            }
            let arrAll = [...state.allDogs];
            let arrSearch = [...state.dogsName]
            let ord;
           
            if(action.payload === "A") {
                if(state.dogsName.length){
                    ord = arrSearch.sort(orderAsc);
                    return {
                        ...state,
                        dogsName: ord
                    }
                }else{
                    ord = arrAll.sort(orderAsc);
                }
            }
            else if(action.payload === "Z") {
                if(state.dogsName.length){
                    ord = arrSearch.sort(orderDes);
                    return {
                        ...state,
                        dogsName: ord
                    }
                }else{
                    ord = arrAll.sort(orderDes);
                }
            }

            return {
                ...state,
                allDogs:  ord,
            }


        case FILTER_WEIGHT:
            const highLow = (a, b) => {return parseInt(b.weight.split(" - ")[0]) - parseInt(a.weight.split(" - ")[0])};
            const lowHigh = (a, b) => {return parseInt(a.weight.split(" - ")[0]) - parseInt(b.weight.split(" - ")[0])};
            let wAll = [...state.allDogs];
            let wSearch = [...state.dogsName];
            let res;
            if(action.payload === "L"){
                if(state.dogsName.length){
                    res = wSearch.sort(lowHigh);
                    return {
                        ...state,
                        dogsName: res
                    }
                }else{
                    res = wAll.sort(lowHigh);
                }
            }
            else if(action.payload === "H"){
                if(state.dogsName.length){
                    res = wSearch.sort(highLow);
                    return {
                        ...state,
                        dogsName: res
                    }
                }else{
                    res = wAll.sort(highLow);
                }
            }

            return{
                ...state,
                allDogs: res,
            }

        case FILTER_SOURCE:
            let filteredSource;
            if(action.payload === "CREATED"){
                if(state.dogsName.length > 0) {
                    filteredSource = state.dogsNameCopy.filter(e => typeof(e.id) !== 'number')
                    return filteredSource.length === 0 ? {
                        ...state,
                        dogsName: [...state.dogsName],
                        // errorDB: window.alert("No Dog Found in DB"),
                        errorDB:   Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No dog has been created',
                          })
                    } : {
                        ...state,
                        dogsName: filteredSource,
                    }
                }
                else {
                    filteredSource = state.allDogsCopy.filter(e => typeof(e.id) !== 'number')
                }
            }
            if(action.payload === "API"){
                if(state.dogsName.length > 0) {
                    filteredSource = state.dogsNameCopy.filter(e => typeof(e.id) === 'number')
                    return {
                        ...state,
                        dogsName: filteredSource
                    }
                }else{
                    filteredSource = state.allDogsCopy.filter(e => typeof(e.id) === 'number')
                }
            }
            if(action.payload === "ALL"){
                if(state.dogsName.length > 0) {
                    filteredSource = state.dogsNameCopy;
                    return {
                        ...state,
                        dogsName: filteredSource
                    }
                }else{
                    filteredSource = state.allDogsCopy;
                }
            }


            return filteredSource.length === 0 ? {
                ...state,
                allDogs: [...state.allDogs],
                // errorDB: window.alert("No dogFound in DB"),
                errorDB:   Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No dog has been created',
                  })
            } : {
                ...state,
                allDogs: filteredSource,
            }


        case FILTER_TEMP:
            let dogTemp = state.allDogsCopy
            let dogTempName = state.dogsNameCopy
            let filterTemp;
            if(action.payload === "ALL" ){
                if(state.dogsName.length > 0){
                    filterTemp = state.dogsNameCopy;
                    return {
                        ...state,
                        dogsName: [...state.dogsNameCopy]
                    }
                }else{
                    filterTemp = state.allDogsCopy
                }
            }else{
                if(state.dogsName.length > 0){
                    filterTemp = dogTempName.filter(e => e.temperaments?.toLowerCase().split(", ").includes(action.payload))
                    return filterTemp.length > 0 ? {
                        ...state,
                        dogsName: filterTemp
                    }:{
                        ...state,
                        dogsName: [...state.dogsNameCopy],
                        errorDB: window.alert("No found"),
                    }
                }else{
                    filterTemp = dogTemp.filter(e => e.temperaments?.toLowerCase().split(", ").includes(action.payload))
                }
            }
          
            return {
                ...state,
                allDogs: filterTemp
            }


        default: 
        return {...state}
    }
}

export default rootReducer;