const employeeProfileService = require("../services/employee.profile.service");
const EmployeeProfileDTO = require("../dto/employee.profile.dto");
const response = require("../middlewares/responseHandler");

class EmployeeProfileController {

  async getAll(req, res) {
    try {
      const data = await employeeProfileService.getAllEmployeeProfile();
      response.success(res,data);
    } catch (error) {
      response.error(res, error);
    }
	}

  async getById(req, res) {
    try {
      const data = await employeeProfileService.getEmployeeProfileById(req.params.id);
      response.success(res, data);
    } catch (error) {
      response.error(res, error);
    }
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeProfileDTO.schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }      

      const employeeProfile = await employeeProfileService.createEmployeeProfile(value);
      response.success(res, employeeProfile, "Employee profile berhasil dibuat", 201);

    } catch (error) {
      response.error(res, error);
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeProfileDTO.schema.validate(req.body, { abortEarly: false });
      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const employeeProfile = await employeeProfileService.updateEmployeeProfile(req.params.id,value);
      response.success(res, null, "Employee Profile berhasil diupdate");

    } catch (error) {
      console.error(error)
      response.error(res, error);
    }
  }

  async delete(req, res) {
    try {
       await employeeProfileService.deleteEmployeeProfile(req.params.id);
       response.success(res, null, "Employee Profile berhasil dihapus")
    } catch (error) {
       response.error(res,error)
    }
  }
}

module.exports = new EmployeeProfileController();
