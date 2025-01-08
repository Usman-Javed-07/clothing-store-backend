const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").sequelize;

class Admin extends Model {}

Admin.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,  
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,       
    modelName: "Admin", 
    tableName: "admins", 
    timestamps: true,
  }
);

module.exports = Admin;
