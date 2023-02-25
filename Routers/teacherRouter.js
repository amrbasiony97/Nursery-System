const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const controller = require("../Controllers/teacherContoller");
const validateTeacher = require("../Core/Validations/validateTeacher");
const multerMW = require("../Core/Multer/multerMW");
const router = express.Router();

router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(multerMW, validateTeacher.validatePostArray, validateMW.validateImageMW, controller.addTeacher)
  .patch(multerMW, validateTeacher.validatePatchArray, validateMW.validateImageMW, controller.updateTeacher)
  .delete(validateTeacher.validateId, validateMW, controller.deleteTeacher);

module.exports = router;