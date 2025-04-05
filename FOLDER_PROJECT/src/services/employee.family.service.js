const employeeFamilyRepository =  require("../repositories/employee.family.repository");
const { sequelize } = require("../models");
const employeeRepository =  require("../repositories/employee.repository"); 

class EmployeeFamilyService {
  
  async getAllEmployeeFamily() {
    try {
      return employeeFamilyRepository.getAll();
    } catch (error) {
      throw error; 
    }
  }

  async getEmployeeFamilyById(id) {
    try {
      const employeeFamily = await employeeFamilyRepository.getById(id);

      if (!employeeFamily) {
        throw new Error(`Employee Family with ID ${id} not found`, { cause: { statusCode: 404 } });
      }

      return employeeFamily;
    } catch (error) {
      throw error;
    }
  }

  
  async validateExistingEmployee (id){
    try {
      const employee =  await employeeRepository.getById(id);
      if(!employee){
        throw new Error(`Employee with ID ${id} not found`,{ cause: { statusCode: 404 } });
      }
    } catch (error) {
       throw error
    }
  }



  async createEmployeeFamily(empFamilyData) {
    const transaction = await sequelize.transaction();
    try {

      await this.validateExistingEmployee(empFamilyData.employee_id);
    
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

    try {
     
      await this.getEmployeeFamilyById(id);
      await this.validateExistingEmployee(empFamilyData.employee_id);

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

    } catch (error) {
       throw error;
    }
  }

  async deleteEmployeeFamily(id) {

    try {

      await this.getEmployeeFamilyById(id);
      return employeeFamilyRepository.delete(id);

    } catch (error) {
       throw error;
    }
  }
}

module.exports = new EmployeeFamilyService();
