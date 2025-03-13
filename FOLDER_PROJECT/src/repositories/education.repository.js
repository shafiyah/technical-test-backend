
const { Education} = require("../models");

class EducationRepository {

  async getAll() {
    return Education.findAll();
  }

  async getById(id) {
    return Education.findByPk(id);
  }

  async create(educationData,transaction) {
    return Education.create(educationData,{transaction});
  }

  async update(id, updateData) {
    return Education.update(updateData, { where: { id } });
  }

  async delete(id) {
    return Education.destroy({ where: { id }});
  }

  async destroy(employee_id, transaction) {
    return Education.destroy({ where: { employee_id: employee_id }, transaction});
  }

}

module.exports = new EducationRepository();