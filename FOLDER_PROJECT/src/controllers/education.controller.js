const educationService = require("../services/education.service");
const EducationDTO = require("../dto/education.dto");


class EducationController {

  async getAll(req, res) {
    const data = await educationService.getAllEducation();
    res.json({ success: true, statusCode: 200, data });
	}

  async getById(req, res) {
    const data = await educationService.getEducationById(req.params.id);
    res.json({ success: true, statusCode: 200, data });
  }

  async create(req, res) {
    try {
      const { error, value } = EducationDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const education = await educationService.createEducation(value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Education berhasil dibuat",
        data: education,
      });

    } catch (error) {
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat membuat Employee",
        error: error.message,
      });
    }
  }

  async update (req, res) {
    try {
      const { error, value } = EducationDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.json({
          statusCode: 400,
          status: "error",
          message: "Validasi gagal",
          errors: error.details.map((err) => err.message),
        });
      }

      const education = await educationService.updateEducation(req.params.id,value);
  
      res.json({
        statusCode: 201,
        status: "success",
        message: "Education updated successfully"
      });

    } catch (error) {
      console.error(error)
      res.json({
        statusCode: 500,
        status: "error",
        message: "Terjadi kesalahan saat mengubah Education",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    await educationService.deleteEducation(req.params.id);
    res.json({ success: true, statusCode: 200, message: "Education deleted successfully" });
  }

}

module.exports = new EducationController();
