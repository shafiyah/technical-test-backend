const employeeService = require("../services/employee.service");
const EmployeeDTO = require("../dto/employee.dto");

class EmployeeController {

  async getAll(req, res) {
    const data = await employeeService.getAllEmployees();
    res.json({ success: true, statusCode: 200, data });
	}

  async getById(req, res) {
    const data = await employeeService.getEmployeeById(req.params.id);
    res.json({ success: true, statusCode: 200, data });
  }

  async create(req, res) {
    try {
      const { error, value } = EmployeeDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const employee = await employeeService.createEmployee(value);
  
      res.status(201).json({
        status: "success",
        message: "Employee berhasil dibuat",
        data: employee,
      });

    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat membuat Employee",
        error: error.message,
      });
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EmployeeDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const employee = await employeeService.updateEmployee(req.params.id,value);
  
      res.status(201).json({
        status: "success",
        message: "Employee updated successfully"
      });

    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat mengubah Employee",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    await employeeService.deleteEmployee(req.params.id);
    res.json({ success: true, statusCode: 200, message: "Employee deleted successfully" });
  }

  async getReport(req, res) {
    const data = await employeeService.getReport();
    res.json({ success: true, statusCode: 200, data });
  }
}

module.exports = new EmployeeController();
