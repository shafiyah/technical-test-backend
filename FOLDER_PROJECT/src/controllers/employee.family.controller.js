const employeeFamilyService = require("../services/employee.family.service");
const EmployeeFamilyDTO = require("../dto/employee.family.dto");
const response = require("../middlewares/responseHandler");

class EmployeeFamilyController {

  async getAll(req, res) {
    try {
      const data = await employeeFamilyService.getAllEmployeeFamily();
      response.success(res, data);
    } catch (error) {
       response.error(res,error);
    }
	}

  async getById(req, res) { 
    try {
      const data = await employeeFamilyService.getEmployeeFamilyById(req.params.id);
      response.success(res,data);
    } catch (error) {
      response.error(res,error);
    }   
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeFamilyDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const employeeFamily = await employeeFamilyService.createEmployeeFamily(value);
      response.success(res,employeeFamily,"Employee Family berhasil dibuat",201);

    } catch (error) {
      response.error(res,error);
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeFamilyDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const employeeProfile = await employeeFamilyService.updateEmployeeFamily(req.params.id,value);
      response.success(res, null, "Employee Family berhasil diupdate",200);

    } catch (error) {
      response.error(res, error);
    }
  }

  async delete(req, res) {
    try {
      await employeeFamilyService.deleteEmployeeFamily(req.params.id);
      response.success(res, null, "Employee family behasil dihapus", 200);
    } catch (error) {
       response.error(res,error);
    }
  }

}

module.exports = new EmployeeFamilyController();
