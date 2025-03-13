const employeeRepository = require("../repositories/employee.repository");
const educationRepository =  require("../repositories/education.repository");
const employeeProfileRepository =  require("../repositories/employee.profile.repository");
const employeeFamilyRepository = require("../repositories/employee.family.repository");
const { sequelize } = require("../models");

class EmployeeService {
  
  async getAllEmployees() {
    return employeeRepository.getAll();
  }

  async getEmployeeById(id) {
    const employee = employeeRepository.getById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async createEmployee(employeeData) {
    const transaction = await sequelize.transaction();
    try {
       
      const employee =  await employeeRepository.create(
         {
            nik: employeeData.nik,
            name:  employeeData.name,
            is_active : true,
            start_date :  employeeData.start_date,
            end_date : employeeData.end_date,
            created_by : employeeData.created_by,
            created_at: new Date(),
            updated_by : employeeData.created_by,
            updated_at : new Date(),
         }, transaction
        )
   
      await employeeProfileRepository.create(
      {   employee_id: employee.id,
          place_of_birth: employeeData.profile.place_of_birth,
          date_of_birth: employeeData.profile.date_of_birth,
          gender: employeeData.profile.gender,
          is_married: employeeData.profile.is_married,
          prof_pict: employeeData.profile.prof_pict,
          created_by : employeeData.created_by,
          created_at: new Date(),
          updated_by : employeeData.created_by,
          updated_at : new Date()
        },
        transaction
      )


      if (Array.isArray(employeeData.education) && employeeData.education.length > 0) {
        await Promise.all(
            employeeData.education.map(f =>
               educationRepository.create({
                    employee_id: employee.id,
                    name: f.name,
                    level: f.level,
                    description: f.description,
                    created_by: employeeData.created_by,
                    created_at: new Date(),
                    updated_by: employeeData.created_by,
                    updated_at: new Date()
                }, transaction)
            )
        );
      }  

      if (Array.isArray(employeeData.family) && employeeData.family.length > 0) {
        await Promise.all(
            employeeData.family.map(f =>
              employeeFamilyRepository.create({
                  employee_id: employee.id,
                  name: f.name,
                  identifier: f.identifier,
                  job: f.job,
                  place_of_birth: f.place_of_birth,
                  date_of_birth: f.date_of_birth,
                  religion:f.religion,
                  is_life: f.is_life,
                  is_devorced : f.is_devorced,
                  relation_status: f.relation_status,
                  created_by : employeeData.created_by,
                  created_at: new Date(),
                  updated_by : employeeData.created_by,
                  updated_at : new Date()
                }, transaction)
            )
        );
      }        

      await transaction.commit();
      return employee;

    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async updateEmployee(employee_id,employeeData) {

    await this.getEmployeeById(employee_id);

    const transaction = await sequelize.transaction();
    try {

      const employee =  await employeeRepository.update( 
        {
            nik: employeeData.nik,
            name:  employeeData.name,
            is_active : true,
            start_date :  employeeData.start_date,
            end_date : employeeData.end_date,
            created_by : employeeData.created_by,
            created_at: new Date(),
            updated_by : employeeData.created_by,
            updated_at : new Date(),
         },parseInt(employee_id), transaction 
        );


   
      await employeeProfileRepository.update(
      {   
          place_of_birth: employeeData.profile.place_of_birth,
          date_of_birth: employeeData.profile.date_of_birth,
          gender: employeeData.profile.gender,
          is_married: employeeData.profile.is_married,
          prof_pict: employeeData.profile.prof_pict,
          created_by : employeeData.created_by,
          created_at: new Date(),
          updated_by : employeeData.created_by,
          updated_at : new Date()
        }, employee_id, transaction 
      )


      if (Array.isArray(employeeData.education) && employeeData.education.length > 0) {
        await educationRepository.destroy(employee_id, transaction );

        await Promise.all(
            employeeData.education.map(f =>
               educationRepository.create({
                    employee_id: employee_id,
                    name: f.name,
                    level: f.level,
                    description: f.description,
                    created_by: employeeData.created_by,
                    created_at: new Date(),
                    updated_by: employeeData.created_by,
                    updated_at: new Date()
                }, transaction)
            )
        );
      }  

      if (Array.isArray(employeeData.family) && employeeData.family.length > 0) {

        await educationRepository.destroy(employee_id, transaction );

        await Promise.all(
            employeeData.family.map(f =>
              employeeFamilyRepository.create({
                  employee_id: employee_id,
                  name: f.name,
                  identifier: f.identifier,
                  job: f.job,
                  place_of_birth: f.place_of_birth,
                  date_of_birth: f.date_of_birth,
                  religion:f.religion,
                  is_life: f.is_life,
                  is_devorced : f.is_devorced,
                  relation_status: f.relation_status,
                  created_by : employeeData.created_by,
                  created_at: new Date(),
                  updated_by : employeeData.created_by,
                  updated_at : new Date()
                }, transaction)
            )
        );
      }        

      await transaction.commit();
      return employee;

    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async deleteEmployee(id) {

    await this.getEmployeeById(id);

    return employeeRepository.delete(id);
  }

  async getReport(){
     return employeeRepository.getReport();
  }
}

module.exports = new EmployeeService();
