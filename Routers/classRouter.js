const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const controller = require("../Controllers/classController");
const validateClass = require("../Core/Validations/validateClass");
const validateTeacher = require("../Core/Validations/validateTeacher");
const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(validateClass.validatePostArray, validateMW, controller.addClass)
  .patch(validateClass.validatePatchArray, validateMW, controller.updateClass)
  .delete(validateClass.validateClassId, validateMW, controller.deleteClass);

router.get(
  "/class/:id",
  validateClass.validateClassId,
  validateMW,
  controller.getClass
);

router.get(
  "/classChildern/:id",
  validateClass.validateIdArray,
  validateMW,
  controller.getClassChildren
);

router.get(
  "/classTeacher/:id",
  validateTeacher.validateId,
  validateMW,
  controller.getClassSupervisor
);

module.exports = router;
