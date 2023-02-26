const { body, param } = require("express-validator");

exports.validatePostArray = [
    body("id").optional().isMongoId().withMessage("Teacher id should be objectID"),
    body("fullname").isAlpha('en-US', {ignore: ' '}).withMessage("fullname should be string"),
    body("email").isEmail().withMessage("email is invalid"),
    body("password").isStrongPassword().withMessage("password should be strong")
];

exports.validatePatchArray = [
    body("id").isMongoId().withMessage("Teacher id should be objectID"),
    body("fullname").optional().isAlpha('en-US', {ignore: ' '}).withMessage("fullname should be string"),
    body("email").optional().isEmail().withMessage("email is invalid"),
    body("password").optional().isStrongPassword().withMessage("password should be strong"),
];

exports.validateId = [
    body("id").isMongoId().withMessage("Teacher id should be objectID")
];

exports.validateIdParam = [
    param("id").isMongoId().withMessage("Teacher id should be objectID")
];