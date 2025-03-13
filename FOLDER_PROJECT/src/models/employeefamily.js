'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const EmployeeFamily = sequelize.define(
    "EmployeeFamily",
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
      name : {
         type : DataTypes.STRING,
         allowNull: true,
      },
      identifier : {
        type : DataTypes.STRING,
        allowNull: true,
      },
      job: {
        type : DataTypes.STRING,
        allowNull: true,
      },
      place_of_birth : {
         type : DataTypes.STRING,
         allowNull: true,
      },
      date_of_birth : {
         type : DataTypes.DATE,
         allowNull: true,
      },
      religion : {
         type : DataTypes.ENUM("Islam","Hindu","Budha","Katolik","Protestan","konghucu"),
         allowNull : true,
      },
      is_life : {
         type : DataTypes.BOOLEAN,
         allowNull : true,
      },
      is_devorced : {
        type : DataTypes.BOOLEAN,
        allowNull : true,
     },
      relation_status : {
         type : DataTypes.ENUM("Suami","Istri","Anak","Anak Sambung"),
         allowNull: true,
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
      tableName: "employee_family",
      timestamps: false,
    }
  ) 

  
  EmployeeFamily.associate = (models) => {
    EmployeeFamily.belongsTo(models.Employee, { foreignKey: "employee_id", onDelete: "CASCADE" });
  };

  return EmployeeFamily;
};