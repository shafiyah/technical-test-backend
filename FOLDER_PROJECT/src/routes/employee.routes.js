const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.getAll);
router.get("/report", employeeController.getReport);
router.get("/:id(\\d+)", employeeController.getById);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.delete);


module.exports = router;
