const {Dog, Temperaments} = require("../db")

const getDogDB = async (req, res)=>{
    try {
        const dogDB = await Dog.findAll({
            include:{
                model: Temperaments,
                attributes:["name_temperament"],
                through:{
                    attributes:[]
                }
            }
        })

        res.status(200).json(dogDB)

    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = getDogDB