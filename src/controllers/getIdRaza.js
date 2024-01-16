require("dotenv").config();
const {API_KEY} = process.env
const axios = require("axios");
const {Dog, Temperaments} = require("../db")

const getIdRaza =  async (req, res)=>{
    urlDogsAll = "https://api.thedogapi.com/v1/breeds"
    const {idRaza} = req.params
    
    try {
        const {data} = await axios(`${urlDogsAll}${API_KEY}`)
        let filter = data.filter((dog)=> dog.id===Number(idRaza))
        
        if (Number(idRaza)<264 && filter.length!==0) {
            res.status(200).json(filter);
        }else if(!Number(idRaza)){
            let dogDb = await Dog.findByPk(idRaza,{
                include:{
                    model: Temperaments,
                    attributes:["name_temperament"],
                    through:{
                        attributes:[]
                    }
                }
            })
            res.status(200).json(dogDb)
        } else {
            res.status(404).json({ error: "Raza no encontrada" });
        }

    } catch (error) {
        res.status(404).json({error: "ocurrio un error"+ error.message})
    }
    
}

module.exports= getIdRaza