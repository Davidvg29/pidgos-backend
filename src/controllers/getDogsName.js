const axios = require("axios")
const {Dog, Temperaments} = require("../db")
const {Op} = require("sequelize")

const getDogsName = async (req, res)=>{
    const {name} = req.query
  try {
    // const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
   const {data} = await axios("https://api.thedogapi.com/v1/breeds?api_key=live_bllhB4LQgINRab1WHkfUFNuG6EEVE4oTYHwwzd88CWdMh7qZHfcvJb4zWpZV6caH")


    let filtrarRazas = data.filter((dog)=>{
      return dog.name && dog.name.toLowerCase().includes(name.toLowerCase()) ||
      dog.breed_group && dog.breed_group.toLowerCase().includes(name.toLowerCase())})
    // console.log(filtrarRazas)
    
    let dogDB = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
      }},
        include:{
            model: Temperaments,
            attributes:["name_temperament"],
            through:{
                attributes:[]
            }
        }
    
    })
  let dogsTotal=[...filtrarRazas, ...dogDB]
  // console.log(filtrarRazas)

  if (dogsTotal.length>0) return res.status(200).json(dogsTotal)
  else return res.status(200).json(dogsTotal=[{name:"raza inexistente"}])

  } catch (error) {
    res.status(500).json({error: error.message})
  }

}
module.exports = getDogsName


















//ORIGINAL Y FUNCIONA PERO CON ERRORES LO OBTENIDO NO TIENE URL DE IMAGE

// const axios = require("axios")
// const {Dog, Temperaments} = require("../db")
// const {Op} = require("sequelize")

// const getDogsName = async (req, res)=>{
//     const {name} = req.query
//   try {
//     const {data} = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
   

//     const dogDB = await Dog.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`
//       }},
//         include:{
//             model: Temperaments,
//             attributes:["name_temperament"],
//             through:{
//                 attributes:[]
//             }
//         }
    
//     })
//   const dogsTotal=[...data, ...dogDB]
  

//   if (dogsTotal.length>0) return res.status(200).json(dogsTotal)
//   else return res.status(200).json(dogsTotal=[{name:"raza inexistente"}])

//   } catch (error) {
//     res.status(500).json({error: error.message})
//   }

// }
// module.exports = getDogsName