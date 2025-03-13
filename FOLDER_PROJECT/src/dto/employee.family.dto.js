const Joi = require("joi");

class EmployeeFamilyDTO {
  
  static schema =   Joi.object({
    employee_id: Joi.number().required().messages({
      "number.empty": "Employee id tidak boleh kosong",
      "any.required": "Employee id harus diisi",
    }),
    name: Joi.string().trim().required().messages({
      "string.empty": "Nama keluarga tidak boleh kosong",
      "any.required": "Nama keluarga harus diisi",
    }),
    identifier: Joi.string().trim().required().messages({
      "string.empty": "Identifier keluarga tidak boleh kosong",
      "any.required": "Identifier keluarga harus diisi",
    }),
    relation_status: Joi.string()
      .valid("Suami", "Istri", "Anak", "Anak Sambung")
      .required()
      .messages({
        "any.only": "Relation Status harus Suami, Istri, Anak, atau Anak Sambung",
        "any.required": "Relation Status harus diisi",
      }),
    job: Joi.string().trim().required().messages({
        "string.empty": "pekerjaan  tidak boleh kosong",
        "any.required": "pekerjaan  harus diisi",
    }),

    place_of_birth: Joi.string().trim().required().messages({
        "string.empty": "Tempat lahir keluarga tidak boleh kosong",
        "any.required": "Tempat lahir keluarga harus diisi",
    }),

    date_of_birth: Joi.date().required().messages({
        "date.base": "Tanggal lahir keluarga harus berupa tanggal",
        "any.required": "Tanggal lahir keluarga harus diisi",
    }),

    religion: Joi.string()
      .valid("Islam","Hindu","Budha","Katolik","Protestan","konghucu")
      .required()
      .messages({
        "any.only": "agama harus valid (Islam,Hindu,Budha,Katolik,Protestan,konghucu)",
        "any.required": "Level pendidikan harus diisi",
    }),

    is_life:Joi.boolean().required().messages({
        "string.empty": "Status hidup keluarga tidak boleh kosong",
        "any.required": "Status hidup harus diisi",
    }),

    is_devorced: Joi.boolean().required().messages({
        "string.empty": "Status cerai keluarga tidak boleh kosong",
        "any.required": "Status cerai harus diisi",
    }),
    created_by: Joi.string().trim().required().messages({
      "string.empty": "Created By tidak boleh kosong",
      "any.required": "Created By harus diisi",
    }),
    
  })
}

module.exports = EmployeeFamilyDTO;
