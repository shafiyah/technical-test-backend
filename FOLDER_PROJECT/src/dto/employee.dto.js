const Joi = require("joi");

class EmployeeDTO {
  static schema = Joi.object({
    nik: Joi.string().trim().required().messages({
      "string.empty": "NIK tidak boleh kosong",
      "any.required": "NIK harus diisi",
    }),
    name: Joi.string().trim().required().messages({
      "string.empty": "Nama tidak boleh kosong",
      "any.required": "Nama harus diisi",
    }),
    start_date: Joi.date().required().messages({
      "date.base": "Start Date harus berupa tanggal",
      "any.required": "Start Date harus diisi",
    }),
    end_date: Joi.date().greater(Joi.ref("start_date")).required().messages({
      "date.base": "End Date harus berupa tanggal",
      "date.greater": "End Date harus lebih besar dari Start Date",
      "any.required": "End Date harus diisi",
    }),
    created_by: Joi.string().trim().required().messages({
      "string.empty": "Created By tidak boleh kosong",
      "any.required": "Created By harus diisi",
    }),

    profile: Joi.object({
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
    }).required(),

    family: Joi.array().items(
      Joi.object({
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
        
      })
    ).min(1).messages({
      "array.min": "Setidaknya satu anggota keluarga harus diisi",
    }),

    education: Joi.array().items(
      Joi.object({
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
      })
    ).min(1).messages({
      "array.min": "Setidaknya satu pendidikan harus diisi",
    }),
  });
}

module.exports = EmployeeDTO;
