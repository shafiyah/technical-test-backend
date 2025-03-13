'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("education", [
      { employee_id: 1,
        name: "SMKN 7 Jakarta",
        level: "SMA",
        description: "Sekolah Menegah Atas",
        created_by : "admin",
        created_at : "2022-12-12",
        updated_by : "admin",
        updated_at : "2022-12-12",
      },
      {
        employee_id: 2,
        name: "Universitas Negeri Jakarta",
        level: "Strata 1",
        description: "Sarjana",
        created_by: "admin",
        created_at: new Date(),
        updated_by: "admin",
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("eduaction",null,{});
  }
};
