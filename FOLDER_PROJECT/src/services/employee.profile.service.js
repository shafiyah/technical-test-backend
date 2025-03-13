const employeeProfileRepository =  require("../repositories/employee.profile.repository");
const { sequelize } = require("../models");

class EmployeeProfileService {
  
  async getAllEmployeeProfile() {
    return employeeProfileRepository.getAll();
  }

  async getEmployeeProfileById(id) {
    const employeeProfile = employeeProfileRepository.getById(id);

    if (!employeeProfile) {
      throw new NotFoundException(`Employee Profile with ID ${id} not found`);
    }
    return employeeProfile;
  }

  async createEmployeeProfile(empProfileData) {
    const transaction = await sequelize.transaction();
    try {
       
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

    await this.getEmployeeProfileById(employeeProfile_id);
      const education  = await employeeProfileRepository.update(
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
    return education;
  }

  async deleteEmployeeProfile(id) {

    await this.getEmployeeProfileById(id);

    return employeeProfileRepository.delete(id);
  }
}

module.exports = new EmployeeProfileService();
