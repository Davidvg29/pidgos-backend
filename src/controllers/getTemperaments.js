// esto en consola de potsgress altera el id para que tenga un default que quierammos
// ALTER SEQUENCE dogs_id_seq RESTART WITH 266;

const axios = require("axios")
require("dotenv").config();
const {API_KEY} = process.env
const {Temperaments} = require("../db")

urlDogsAll = "https://api.thedogapi.com/v1/breeds"

const getTemperaments = async (req, res)=>{
    
    try {
        const {data} = await axios(`${urlDogsAll}${API_KEY}`)
        const temperaments = []
        
        data.forEach(dog => {
            if (dog.temperament) {
                const razaSeparado = dog.temperament.split(', ').map(a => a.trim());
                temperaments.push(...razaSeparado);
            }
        });

        const clearTemperaments = Array.from(new Set(temperaments))
        
        const objClearTemperaments = clearTemperaments.map(name_temperament=>({name_temperament}))

        await Temperaments.update(objClearTemperaments, {where: {name_temperament: null}})

        res.status(200).json(clearTemperaments)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
module.exports = getTemperaments