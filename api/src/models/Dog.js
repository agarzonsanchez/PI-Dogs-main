const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      maxHeight: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      minHeight: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      maxWeight: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      minWeight: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      life_expectancy: {
        type: DataTypes.STRING,
        //allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        //allowNull: true,
      },
    },
    {
      timestamps: false, // removes timestamps from table. ( createdAt, updatedAt)
    }
  );

  sequelize.define(
    "temperament",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // removes timestamps from table. ( createdAt, updatedAt)
    }
  );
};
