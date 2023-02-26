const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const authenticateMW = require("../Core/Auth/authenticateMW")
const controller = require("../Controllers/teacherContoller");
const validateTeacher = require("../Core/Validations/validateTeacher");
const multerMW = require("../Core/Multer/multerMW");
const router = express.Router();

router
  .route("/teachers")
  .get(authenticateMW.checkAdmin, controller.getAllTeachers)
  .post(authenticateMW.checkAdmin, multerMW, validateTeacher.validatePostArray, validateMW.validateImageMW, controller.addTeacher)
  .patch(authenticateMW.checkTeacherAndAdminBody, multerMW, validateTeacher.validatePatchArray, validateMW.validateImageMW, controller.updateTeacher)
  .delete(authenticateMW.checkAdmin, validateTeacher.validateId, validateMW, controller.deleteTeacher);

router.get("/teachers/:id", authenticateMW.checkTeacherAndAdminParam, validateTeacher.validateIdParam, validateMW, controller.getTeacher);

module.exports = router;