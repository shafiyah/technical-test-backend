'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("education", {
      fields: ["employee_id"],
      type: "foreign key",
      name: "fk_education_employee",
      references: {
        table: "employee",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("employee_family", {
      fields: ["employee_id"],
      type: "foreign key",
      name: "fk_employee_family_employee",
      references: {
        table: "employee",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("employee_profile", {
      fields: ["employee_id"],
      type: "foreign key",
      name: "fk_employee_profile_employee",
      references: {
        table: "employee",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("education", "fk_education_employee");
    await queryInterface.removeConstraint("employee_family", "fk_employee_family_employee");
    await queryInterface.removeConstraint("employee_profile", "fk_employee_profile_employee");
  },
};
