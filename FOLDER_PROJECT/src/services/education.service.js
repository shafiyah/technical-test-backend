const educationRepository =  require("../repositories/education.repository");
const employeeRepository =  require("../repositories/employee.repository");
const { sequelize } = require("../models");

class EduactionService {
  
  async getAllEducation() {
    try {
      return educationRepository.getAll();
    } catch (error) {
      throw error;
    } 
  }


  async getEducationById(id) {
    try {

      const education = await educationRepository.getById(id);

      if (!education) {
        throw new Error(`Education with ID ${id} not found`, { cause: { statusCode: 404 } });
      }
      return education;
    }catch(error){
       throw error
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

  async createEducation(educationData) {
    const transaction = await sequelize.transaction();
    try {
      
      await this.validateExistingEmployee(educationData.employee_id);
  
      const education =  await 
        educationRepository.create({
          employee_id: educationData.employee_id,
          name: educationData.name,
          level: educationData.level,
          description: educationData.description,
          created_by: educationData.created_by,
          created_at: new Date(),
          updated_by: educationData.created_by,
          updated_at: new Date()
        }, transaction);

      await transaction.commit();

      return education;

    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async updateEducation(education_id,educationData) {
    try {
      
      await this.getEducationById(education_id);
      await this.validateExistingEmployee(educationData.employee_id);

      const education  = await educationRepository.update(education_id,{
        employee_id: educationData.employee_id,
        name: educationData.name,
        level: educationData.level,
        description: educationData.description,
        updated_by: educationData.created_by,
        updated_at: new Date()
      })

      return education;

    } catch (error) {
       throw error;
    }
  }

  async deleteEducation(id) {
    try {

      await this.getEducationById(id);
      return educationRepository.delete(id);

    } catch (error) {
       throw error;
    }
  }


}

module.exports = new EduactionService();
