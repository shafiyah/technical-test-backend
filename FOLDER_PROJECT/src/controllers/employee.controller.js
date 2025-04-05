const employeeService = require("../services/employee.service");
const EmployeeDTO = require("../dto/employee.dto");
const response = require("../middlewares/responseHandler");

class EmployeeController {

  async getAll(req, res) {
    try {
      const data = await employeeService.getAllEmployees();
      response.success(res,data);
    } catch (error) {
       response.error(res,error)
    }
	}

  async getById(req, res) {
    try {
      const data = await employeeService.getEmployeeById(req.params.id);
      response.success(res,data)
    } catch (error) {
      response.error(res,error);
    }
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeDTO.schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const employee = await employeeService.createEmployee(value);
      response.success(res,employee,"Employee berhasil dibuat",201);

    } catch (error) {
      console.error(error)
      response.error(res,error)
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }


      const employee = await employeeService.updateEmployee(req.params.id,value);
      response.success(res,null,"Employee updated successfully", 200);

    } catch (error) {
      console.error(error)
      response.error(error);
    }
  }

  async delete(req, res) {
    try {
      await employeeService.deleteEmployee(req.params.id);
      response.success(res,null,"Employee behasil dihapus",200);

    } catch (error) {
        response.error(res, error)
    }
  }

  async getReport(req, res) {
    try {
      const data = await employeeService.getReport();
      response.error(res,data)
    } catch (error) {
      response.error(res, error)
    }
  }
}

module.exports = new EmployeeController();
