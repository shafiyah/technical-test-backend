
const { EmployeeProfile } = require("../models");


class EmployeeProfileRepository {

  async getAll() {
    return EmployeeProfile.findAll();
  }

  async getById(id) {
    return EmployeeProfile.findByPk(id);
  }

  async create(employeeProfileData,transaction) {
    return EmployeeProfile.create(employeeProfileData,{transaction});
  }

  async update(data, employee_id, transaction) {
    return EmployeeProfile.update(data, { where: { employee_id:employee_id  }, transaction });
  }

  async delete(employeeId, transaction) {
    return EmployeeProfile.destroy({ where: { employee_id: employeeId }, transaction });
  }
}

module.exports = new EmployeeProfileRepository();