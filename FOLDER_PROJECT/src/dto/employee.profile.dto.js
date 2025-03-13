const Joi = require("joi");

class EmployeeProfileDTO {
  static schema = Joi.object({
      employee_id: Joi.number().required().messages({
        "number.empty": "Employee id tidak boleh kosong",
        "any.required": "Employee id harus diisi",
      }),
      place_of_birth: Joi.string().trim().required().messages({
        "string.empty": "Tempat lahir tidak boleh kosong",
        "any.required": "Tempat lahir harus diisi",
      }),
      date_of_birth: Joi.date().required().messages({
        "date.base": "Tanggal lahir harus berupa tanggal",
        "any.required": "Tanggal lahir harus diisi",
      }),
      gender: Joi.string().valid("Laki-Laki", "Perempuan").required().messages({
        "any.only": "Gender hanya boleh Laki-Laki atau Perempuan",
        "any.required": "Gender harus diisi",
      }),
      is_married: Joi.boolean().required().messages({
        "any.required": "Status menikah harus diisi",
      }),
      prof_pict: Joi.string().allow(null, "").messages({
        "string.base": "Profile picture harus berupa string",
      }),
      created_by: Joi.string().trim().required().messages({
        "string.empty": "Created By tidak boleh kosong",
        "any.required": "Created By harus diisi",
      }),
    })

}
module.exports = EmployeeProfileDTO;