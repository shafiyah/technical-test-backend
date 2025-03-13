const employeeFamilyService = require("../services/employee.family.service");
const EmployeeFamilyDTO = require("../dto/employee.family.dto");


class EmployeeFamilyController {

  async getAll(req, res) {
    const data = await employeeFamilyService.getAllEmployeeFamily();
    res.json({ success: true, statusCode: 200, data });
	}

  async getById(req, res) {
    const data = await employeeFamilyService.getEmployeeFamilyById(req.params.id)
    res.json({ success: true, statusCode: 200, data });
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeFamilyDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const employeeFamily = await employeeFamilyService.createEmployeeFamily(value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Employee family berhasil dibuat",
        data: employeeFamily,
      });

    } catch (error) {
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat membuat Employee family",
        error: error.message,
      });
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeFamilyDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.json({
          statusCode: 400,
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const education = await employeeFamilyService.updateEmployeeFamily(req.params.id,value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Employee family updated successfully"
      });

    } catch (error) {
      console.error(error)
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat mengubah Employee family",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    await employeeFamilyService.deleteEmployeeFamily(req.params.id);
    res.json({ success: true, statusCode: 200, message: "Employee family deleted successfully" });
  }

}

module.exports = new EmployeeFamilyController();
