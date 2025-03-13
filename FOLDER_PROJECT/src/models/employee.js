'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
        id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        nik:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active:{
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        start_date:{
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date:{
          type: DataTypes.DATE,
          allowNull: false,
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
      tableName: "employee",
      timestamps: false,
    }
  );


  Employee.associate = (models) => {
    Employee.hasMany(models.Education, { foreignKey: "employee_id", onDelete: "CASCADE" });
    Employee.hasMany(models.EmployeeFamily, { foreignKey: "employee_id", onDelete: "CASCADE" });
    Employee.hasOne(models.EmployeeProfile, { foreignKey: "employee_id", onDelete: "CASCADE" });
  };

  return Employee;
};