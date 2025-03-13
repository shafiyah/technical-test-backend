const educationRepository =  require("../repositories/education.repository");
const { sequelize } = require("../models");

class EduactionService {
  
  async getAllEducation() {
    return educationRepository.getAll();
  }


  async getEducationById(id) {
    const employee = educationRepository.getById(id);

    if (!employee) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return employee;
  }

  async createEducation(educationData) {
    const transaction = await sequelize.transaction();
    try {
       console.log(educationData)
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

    await this.getEducationById(education_id);
      const education  = await educationRepository.update(education_id,{
        employee_id: educationData.employee_id,
        name: educationData.name,
        level: educationData.level,
        description: educationData.description,
        updated_by: educationData.created_by,
        updated_at: new Date()
      })
    return education;
  }

  async deleteEducation(id) {

    await this.getEducationById(id);

    return educationRepository.delete(id);
  }
}

module.exports = new EduactionService();
