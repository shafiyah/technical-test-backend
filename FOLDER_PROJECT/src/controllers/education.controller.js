const educationService = require("../services/education.service");
const EducationDTO = require("../dto/education.dto");
const response = require("../middlewares/responseHandler");


class EducationController {

  async getAll(req, res) {
    try {
      const data = await educationService.getAllEducation();
      response.success(res, data);
    } catch (error) {
      response.error(res,error);
    }
	}

  async getById(req, res) {
  try {
      const data = await educationService.getEducationById(req.params.id);
      response.success(res, data);
    } catch (error) {
      response.error(res,error);
    }
  }

  async create(req, res) {
    try {
      const { error, value } = EducationDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const education = await educationService.createEducation(value);
      response.success(res, education, "Education berhasil dibuat", 201);

    } catch (error) {
      response.error(res, error);
    }
    
  }

  async update (req, res) {
    try {
      const { error, value } = EducationDTO.schema.validate(req.body, { abortEarly: false });

      if (error) {
        return response.validationError(res, error.details.map((err) => err.message));
      }

      const education = await educationService.updateEducation(req.params.id,value);
      response.success(res, null, "Education berhasil diupdate", 200);

    } catch (error) {
      console.error(error)
      response.error(res, error);
    }
  }

  async delete(req, res) {
    try {

      await educationService.deleteEducation(req.params.id);
      response.success(res, null, "Education berhasil dihapus", 200);

    } catch (error) {
      response.error(res, error);
    }
  }

}

module.exports = new EducationController();
