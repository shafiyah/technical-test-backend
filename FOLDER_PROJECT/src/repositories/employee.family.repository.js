
const { EmployeeFamily } = require("../models");


class EmployeeFamilyRepository {

  async getAll() {
    return EmployeeFamily.findAll();
  }

  async getById(id) {
    return EmployeeFamily.findByPk(id);
  }

  async create(employeeFamilyData,transaction) {
    return EmployeeFamily.create(employeeFamilyData,{transaction});
  }

  async update(id, employeeFamilyData) {
    return EmployeeFamily.update(employeeFamilyData, { where: { id } });
  }

  async delete(id) {
    return EmployeeFamily.destroy({ where: { id }});
  }

  async destroy(employee_id, transaction) {
    return EmployeeFamily.destroy({ where: { employee_id: employee_id }, transaction});
  }
}

module.exports = new EmployeeFamilyRepository();