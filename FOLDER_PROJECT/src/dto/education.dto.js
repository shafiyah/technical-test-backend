const Joi = require("joi");

class EducationDTO {
  static schema = 
  Joi.object({
    employee_id: Joi.number().required().messages({
      "number.empty": "Employee id tidak boleh kosong",
      "any.required": "Employee id harus diisi",
    }),
    name: Joi.string().trim().required().messages({
      "string.empty": "Nama pendidikan tidak boleh kosong",
      "any.required": "Nama pendidikan harus diisi",
    }),
    level: Joi.string()
      .valid("TK", "SD", "SMP", "SMA", "Strata 1", "Strata 2", "Doktor", "Profesor")
      .required()
      .messages({
        "any.only": "Level pendidikan harus valid (TK, SD, SMP, SMA, Strata 1, Strata 2, Doktor, Profesor)",
        "any.required": "Level pendidikan harus diisi",
    }),

    description: Joi.string().trim().required().messages({
        "string.empty": "deskripsi pendidikan tidak boleh kosong",
        "any.required": "deskripsi pendidikan harus diisi",
    }),
    created_by: Joi.string().trim().required().messages({
      "string.empty": "Created By tidak boleh kosong",
      "any.required": "Created By harus diisi",
    }),  
  })
}

module.exports = EducationDTO;
