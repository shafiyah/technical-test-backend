const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education.controller");

router.get("/", educationController.getAll);
router.get("/:id(\\d+)", educationController.getById);
router.post("/", educationController.create);
router.put("/:id", educationController.update);
router.delete("/:id", educationController.delete);


module.exports = router;
