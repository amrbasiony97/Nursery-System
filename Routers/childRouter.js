const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const { checkAdmin } = require("../Core/Auth/authenticateMW");
const controller = require("../Controllers/childContoller");
const validateChild = require("../Core/Validations/validateChild");
const router = express.Router();

router
  .route("/child")
  .all(checkAdmin)
  .get(controller.getAllChildren)
  .post(validateChild.validatePostArray, validateMW, controller.addChild)
  .patch(validateChild.validatePatchArray, validateMW, controller.updateChild)
  .delete(validateChild.validateId, validateMW, controller.deleteChild);

router.get("/child/:id", checkAdmin, validateChild.validateIdParam, validateMW, controller.getChild);

module.exports = router;
