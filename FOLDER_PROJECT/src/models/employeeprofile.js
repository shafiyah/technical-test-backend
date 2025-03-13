'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const EmployeeProfile = sequelize.define(
     "EmployeeProfile",
     {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      place_of_birth : {
         type: DataTypes.STRING,
         allowNull:true,
      },
      date_of_birth : {
        type : DataTypes.DATE,
        allowNull:true,
      },
      prof_pict : {
        type: DataTypes.STRING,
        allowNull:true,
      },
      gender: {
         type: DataTypes.ENUM("Laki-Laki","Perempuan"),
         allowNull : true,
      },
      is_married : {
         type : DataTypes.BOOLEAN,
         allowNull:true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
     },
     {
        tableName: "employee_profile",
        timestamps: false,
     }
  )

  EmployeeProfile.associate = (models) => {
    EmployeeProfile.belongsTo(models.Employee, { foreignKey: "employee_id", onDelete: "CASCADE" });
  };
  
  return EmployeeProfile;
};