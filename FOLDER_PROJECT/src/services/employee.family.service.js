const employeeFamilyRepository =  require("../repositories/employee.family.repository");
const { sequelize } = require("../models");

class EmployeeFamilyService {
  
  async getAllEmployeeFamily() {
    return employeeFamilyRepository.getAll();
  }

  async getEmployeeFamilyById(id) {
    const employeeFamily = employeeFamilyRepository.getById(id);

    if (!employeeFamily) {
      throw new NotFoundException(`Employee Family with ID ${id} not found`);
    }
    return employeeFamily;
  }

  async createEmployeeFamily(empFamilyData) {
    const transaction = await sequelize.transaction();
    try {
    
      const employeeFamily =  await 
        employeeFamilyRepository.create({
          employee_id: empFamilyData.employee_id,
          name: empFamilyData.name,
          identifier: empFamilyData.identifier,
          job: empFamilyData.job,
          place_of_birth: empFamilyData.place_of_birth,
          date_of_birth: empFamilyData.date_of_birth,
          religion:empFamilyData.religion,
          is_life: empFamilyData.is_life,
          is_devorced : empFamilyData.is_devorced,
          relation_status: empFamilyData.relation_status,
          created_by : empFamilyData.created_by,
          created_at: new Date(),
          updated_by : empFamilyData.created_by,
          updated_at : new Date()
        }, transaction);

      await transaction.commit();

      return employeeFamily;

    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async updateEmployeeFamily(id,empFamilyData) {

    await this.getEmployeeFamilyById(id);

      const employeeFamily  = await employeeFamilyRepository.update(
        id,{
          employee_id: empFamilyData.employee_id,
          name: empFamilyData.name,
          identifier: empFamilyData.identifier,
          job: empFamilyData.job,
          place_of_birth: empFamilyData.place_of_birth,
          date_of_birth: empFamilyData.date_of_birth,
          religion:empFamilyData.religion,
          is_life: empFamilyData.is_life,
          is_devorced : empFamilyData.is_devorced,
          relation_status: empFamilyData.relation_status,
          updated_by : empFamilyData.created_by,
          updated_at : new Date()
      })
    return employeeFamily;
  }

  async deleteEmployeeFamily(id) {

    await this.getEmployeeFamilyById(id)

    return employeeFamilyRepository.delete(id);
  }
}

module.exports = new EmployeeFamilyService();
