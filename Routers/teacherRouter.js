const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const controller = require("../Controllers/teacherContoller");
const validateTeacher = require("../Core/Validations/validateTeacher");
const router = express.Router();

router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(validateTeacher.validatePostArray, validateMW, controller.addTeacher)
  .patch(validateTeacher.validatePatchArray, validateMW, controller.updateTeacher)
  .delete(validateTeacher.validateId, validateMW, controller.deleteTeacher);

module.exports = router;
