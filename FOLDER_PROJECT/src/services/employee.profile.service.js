const employeeProfileRepository =  require("../repositories/employee.profile.repository");
const employeeRepository =  require("../repositories/employee.repository");
const { sequelize } = require("../models");

class EmployeeProfileService {
  
  async getAllEmployeeProfile() {
    try {
      return employeeProfileRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeProfileById(id) {
    try {

      const employeeProfile = await employeeProfileRepository.getById(id);

      if (!employeeProfile) {
        throw new Error(`Employee Profile with ID ${id} not found`, { cause: { statusCode: 404 } });
      }

      return employeeProfile;
      
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


  async createEmployeeProfile(empProfileData) {
    const transaction = await sequelize.transaction();
    try {

      await this.validateExistingEmployee(empProfileData.employee_id);
 
      const employeeProfile =  await 
        employeeProfileRepository.create({
          employee_id: empProfileData.employee_id,
          place_of_birth: empProfileData.place_of_birth,
          date_of_birth: empProfileData.date_of_birth,
          gender: empProfileData.gender,
          is_married: empProfileData.is_married,
          prof_pict: empProfileData.prof_pict,
          created_by : empProfileData.created_by,
          created_at: new Date(),
          updated_by : empProfileData.created_by,
          updated_at : new Date()
        }, transaction);

      await transaction.commit();

      return employeeProfile;

    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async updateEmployeeProfile(employeeProfile_id,empProfileData) {

    try {
    
      await this.getEmployeeProfileById(employeeProfile_id);

      await this.validateExistingEmployee(empProfileData.employee_id);

      const employeeProfile  = await employeeProfileRepository.update(
        employeeProfile_id,{
          employee_id: empProfileData.employee_id,
          place_of_birth: empProfileData.place_of_birth,
          date_of_birth: empProfileData.date_of_birth,
          gender: empProfileData.gender,
          is_married: empProfileData.is_married,
          prof_pict: empProfileData.prof_pict,
          updated_by : empProfileData.created_by,
          updated_at : new Date()
      })
       
      return employeeProfile;

    } catch (error) {
       throw error;
    }

  }

  async deleteEmployeeProfile(id) {  
  try {

    await this.getEmployeeProfileById(id);
    return employeeProfileRepository.delete(id);

  } catch (error) {
        throw error;
  }

  }

}

module.exports = new EmployeeProfileService();
