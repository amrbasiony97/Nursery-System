const { body } = require("express-validator");

exports.validatePatchArray = [
    body("id").optional().isMongoId().withMessage("Admin id should be objectID"),
    body("username").optional().matches(/^[A-Za-z][A-Za-z0-9_]{2,29}$/).withMessage("username should be in the format of a-z,A-Z,0-9,_ and should be between 3 and 30 characters"),
    body("password").optional().isStrongPassword().withMessage("password should be strong")
];