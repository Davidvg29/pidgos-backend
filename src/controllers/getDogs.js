const axios = require("axios")
require("dotenv").config();
const {Dog, Temperaments} = require("../db")
const {API_KEY} = process.env

const urlDogsAll = "https://api.thedogapi.com/v1/breeds"
const getDogs =  async (req, res)=>{
    
  try {
    const {data} = await axios(`${urlDogsAll}${API_KEY}`)
    const dogDB = await Dog.findAll({
      include:{
          model: Temperaments,
          attributes:["name_temperament"],
          through:{
              attributes:[]
          }
      }
  })
    const dogTotal = [...data, ...dogDB]
    res.status(200).json(dogTotal)

  } catch (error) {
    res.status(404).json({error: error.message})
  }

}

module.exports= getDogs