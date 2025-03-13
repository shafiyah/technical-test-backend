const employeeProfileService = require("../services/employee.profile.service");
const EmployeeProfileDTO = require("../dto/employee.profile.dto");


class EmployeeProfileController {

  async getAll(req, res) {
    const data = await employeeProfileService.getAllEmployeeProfile();
    res.json({ success: true, statusCode: 200, data });
	}

  async getById(req, res) {
    const data = await employeeProfileService.getEmployeeProfileById(req.params.id);
    res.json({ success: true, statusCode: 200, data });
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeProfileDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const education = await employeeProfileService.createEmployeeProfile(value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Employee profile berhasil dibuat",
        data: education,
      });

    } catch (error) {
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat membuat Employee profile",
        error: error.message,
      });
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeProfileDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.json({
          statusCode: 400,
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const education = await employeeProfileService.updateEmployeeProfile(req.params.id,value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Employee profile updated successfully"
      });

    } catch (error) {
      console.error(error)
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat mengubah Employee profile",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    await employeeProfileService.deleteEmployeeProfile(req.params.id);
    res.json({ success: true, statusCode: 200, message: "Employee profile deleted successfully" });
  }

}

module.exports = new EmployeeProfileController();
