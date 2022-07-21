const axios = require("axios");
const { Dog , Temperaments } = require("../db");

const getDogsAPI = async () => {
    try {
        const dogAPI = await axios.get("https://api.thedogapi.com/v1/breeds")
        const result = dogAPI.data.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height.metric,
                weight: e.weight.metric,
                years: e.life_span,
                image: e.image.url,
                temperaments: e.temperament,
            }
        })
        return result
    } catch (error) {
        console.log(error);
    }
}



const getDogsDB = async () => {
    try {
        let infoDB = await Dog.findAll({
            include:{
                model: Temperaments,
                attributes: ['name'],
                through: {attributes: []}
            }
        })
        // infoDB is an merged array between Dogs and Temperaments
        let dogsDB = await infoDB?.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height,
                weight: e.weight,
                years: e.years,
                image: e.image,
                temperaments: e.temperaments.map(t => t.name[0].toUpperCase() + t.name.substring(1)).join(", ")
            }
        })
        return dogsDB;
    } catch (error) {
        console.log(error);
    }
}

const getTotalDogs = async () => {
    try {
        const dataAPI = await getDogsAPI();
        const dataDB = await getDogsDB();
        const totalData = [...dataAPI, ...dataDB];
        return totalData;
    } catch (error) {
        console.log(error);
    }
}

const getDogsById = async (id) => {
    try {
        const dogs = await axios.get("https://api.thedogapi.com/v1/breeds")
        const dogId = dogs.data.find(el => el.id == id); // --> {}
        if(Object.keys(dogId).length > 0){
            return {
                id: dogId.id,
                name: dogId.name,
                height: dogId.height.metric,
                weight: dogId.weight.metric,
                years: dogId.life_span,
                image: dogId.image.url,
                temperaments: dogId.temperament,
            }
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {getDogsAPI, getDogsDB, getTotalDogs, getDogsById}