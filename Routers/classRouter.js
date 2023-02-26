const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const { checkAdmin } = require("../Core/Auth/authenticateMW");
const controller = require("../Controllers/classController");
const validateClass = require("../Core/Validations/validateClass");
const router = express.Router();

router
  .route("/class")
  .all(checkAdmin)
  .get(controller.getAllClasses)
  .post(validateClass.validatePostArray, validateMW, controller.addClass)
  .patch(validateClass.validatePatchArray, validateMW, controller.updateClass)
  .delete(validateClass.validateClassId, validateMW, controller.deleteClass);

router.get(
  "/class/:id",
  checkAdmin,
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClass
);

router.get(
  "/classChildern/:id",
  checkAdmin,
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClassChildren
);

router.get(
  "/classTeacher/:id",
  checkAdmin,
  validateClass.validateClassIdParam,
  validateMW,
  controller.getClassSupervisor
);

module.exports = router;
