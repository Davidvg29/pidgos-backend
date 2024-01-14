const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('temperaments', {
    id_temperament:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_temperament: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  }, {timestamps: false});
};