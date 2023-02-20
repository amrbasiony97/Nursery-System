const { body } = require("express-validator");

exports.validatePostArray = [
    body("_id").isInt().withMessage("Child id should be number"),
    body("fullname").isAlpha('en-US', {ignore: ' '}).withMessage("fullname should be string"),
    body("age").isInt({ min: 1, max: 6 }).withMessage("Age should be number less than 6 years"),
    body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("level should be either: PreKG, KG1 or KG2)"),
    body("address").optional().isObject().withMessage("address should be object"),
    body("address.city").optional().isString().withMessage("city should be string"),
    body("address.street").optional().isString().withMessage("street should be string"),
    body("address.building").optional().isInt().withMessage("building should be number")
];

exports.validatePatchArray = [
    body("_id").isInt().withMessage("Child id should be number"),
    body("fullname").optional().isAlpha('en-US', {ignore: ' '}).withMessage("fullname should be string"),
    body("age").optional().isInt({ min: 1, max: 6 }).withMessage("Age should be number less than 6 years"),
    body("level").optional().isIn(['PreKG', 'KG1', 'KG2']).withMessage("level should be either: PreKG, KG1 or KG2)"),
    body("address").optional().isObject().withMessage("address should be object"),
    body("address.city").optional().isString().withMessage("city should be string"),
    body("address.street").optional().isString().withMessage("street should be string"),
    body("address.building").optional().isInt().withMessage("building should be number")
];

exports.validateId = [
    body("_id").isInt().withMessage("Child id should be number")
];