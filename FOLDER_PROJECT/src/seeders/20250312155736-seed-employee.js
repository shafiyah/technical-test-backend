'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employee", [
      {   name: "Budi", 
          nik:"11012",
          is_active: true,
          start_date:"2022-12-12", 
          end_date : "2029-12-12",
          created_by : "admin",
          created_at : "2022-12-12",
          updated_by : "admin",
          updated_at : "2022-12-12",
         },
      {  name: "Jarot", 
         nik:"11013",
         is_active: true,
         start_date:"2021-09-01", 
         end_date : "2028-09-01",
         created_by: "admin",
         created_at: new Date(),
         updated_by: "admin",
         updated_at: new Date(), },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employee", null, {});
  }
};
