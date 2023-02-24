const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const controller = require("../Controllers/classController");
const validateClass = require("../Core/Validations/validateClass");
const router = express.Router();

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(validateClass.validatePostArray, validateMW, controller.addClass)
  .patch(validateClass.validatePatchArray, validateMW, controller.updateClass)
  .delete(validateClass.validateClassId, validateMW, controller.deleteClass);

router.get(
  "/class/:id",
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClass
);

router.get(
  "/classChildern/:id",
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClassChildren
);

router.get(
  "/classTeacher/:id",
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClassSupervisor
);

module.exports = router;
