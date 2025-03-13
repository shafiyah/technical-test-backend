
const { Employee, EmployeeProfile, Education, EmployeeFamily } = require("../models");
const { sequelize } = require("../models"); 



class EmployeeRepository {
  async getAll() {
    return Employee.findAll({ include: [EmployeeProfile, Education, EmployeeFamily] });
  }

  async getById(id) {
    return Employee.findByPk(id, { include: [EmployeeProfile, Education, EmployeeFamily] });
  }

  async create(employeeData,transaction) {
    return Employee.create(employeeData,{transaction});
  }

  async update(id, updateData, transaction) {
    return Employee.update(updateData, { where: { id  } ,transaction });
  }

  async delete(id) {
    return Employee.destroy({ where: { id } });
  }

  async getReport() {
    try {
      const [results, metadata] = await sequelize.query(`
          SELECT 
              emp.id AS employee_id,  
              emp.nik,
              emp.name,
              emp.is_active,
              ep.gender,
              COALESCE(
                  EXTRACT(YEAR FROM AGE(NOW(), ep.date_of_birth::DATE))::TEXT || ' Year Old', 
                  'Year Old'
              ) AS age,
              e.name AS school_name,
              e.level,
              STRING_AGG(
                  COALESCE(efm.total::TEXT || ' ' || efm.status, '-'), 
                  ' & '
              ) AS family_data
          FROM employee emp
          LEFT JOIN employee_profile ep ON emp.id = ep.employee_id
          LEFT JOIN education e ON emp.id = e.employee_id
          LEFT JOIN (
              SELECT 
                  ef.employee_id,
                  COUNT(ef.id)::INTEGER AS total, 
                  ef.relation_status::TEXT AS status
              FROM employee_family ef 
              GROUP BY ef.employee_id, ef.relation_status
          ) efm ON emp.id = efm.employee_id
          GROUP BY emp.id, ep.gender, ep.date_of_birth, e.name, e.level
          order by emp.id;
      `);

      console.log(results);
      return results;
    } catch (error) {
      console.error("Error executing query:", error);
      return [];
    }
  }
}

module.exports = new EmployeeRepository();
