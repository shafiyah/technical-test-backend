const express = require("express");
const router = express.Router();
const employeeFamilyController = require("../controllers/employee.family.controller");

router.get("/", employeeFamilyController.getAll);
router.get("/:id(\\d+)", employeeFamilyController.getById);
router.post("/", employeeFamilyController.create);
router.put("/:id", employeeFamilyController.update);
router.delete("/:id", employeeFamilyController.delete);


module.exports = router;
