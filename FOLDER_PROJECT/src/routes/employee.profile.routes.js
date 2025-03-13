const express = require("express");
const router = express.Router();
const employeeProfileController = require("../controllers/employee.profile.controller");

router.get("/", employeeProfileController.getAll);
router.get("/:id(\\d+)", employeeProfileController.getById);
router.post("/", employeeProfileController.create);
router.put("/:id", employeeProfileController.update);
router.delete("/:id", employeeProfileController.delete);


module.exports = router;
