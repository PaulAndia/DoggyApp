const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id: {
      type: DataTypes.UUID, // UUID --> standard is 32 digits (8-4-4-4-12), 
      primaryKey : true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4 // UUIDV4 autogenerates the id 
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    height: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    years:{
      type: DataTypes.STRING,
    },

    image:{
      type: DataTypes.STRING,
    },

  }, 
    {
      timestamps: false,
    });
};
