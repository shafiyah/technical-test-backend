'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_family', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      identifier: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
      },
      place_of_birth: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      religion: {
        type: Sequelize.ENUM("Islam","Hindu","Budha","Katolik","Protestan","konghucu")
      },
      is_life: {
        type: Sequelize.BOOLEAN
      },
      is_devorced: {
        type: Sequelize.BOOLEAN
      },
      relation_status: {
        type: Sequelize.ENUM("Suami","Istri","Anak","Anak Sambung")
      },
      created_by: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING
      },
      updated_at: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_family');
  }
};