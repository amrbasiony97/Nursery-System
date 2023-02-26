const express = require("express");
const validateMW = require("../Core/Validations/validateMW");
const { checkAdmin } = require("../Core/Auth/authenticateMW");
const controller = require("../Controllers/adminController");
const validateAdmin = require("../Core/Validations/validateAdmin");
const router = express.Router();

router
  .route("/admin")
  .all(checkAdmin)
  .get(controller.getAdmin)
  .patch(validateAdmin.validatePatchArray, validateMW, controller.updateAdmin)

module.exports = router;