const { body } = require("express-validator");

exports.validatePostArray = [
    body("_id").isInt().withMessage("Class id should be number"),
    body("name").isAlphanumeric().withMessage("name should contain only letters and numbers"),
    body("supervisorID").isMongoId().withMessage("supervisor id should be mongo id"),
    body("children").isArray().withMessage("children should be array of numbers")
    .custom(array => {
        array.forEach(element => {
            if (!Number.isInteger(element))
                throw new Error('children items should be numbers');
        });
        return true;
    })
];

exports.validatePatchArray = [
    body("_id").isInt().withMessage("Class id should be number"),
    body("name").optional().isAlphanumeric().withMessage("name should contain only letters and numbers"),
    body("supervisorID").optional().isMongoId().withMessage("supervisor id should be mongo id"),
    body("children").optional().isArray().withMessage("children should be array of numbers")
    .custom(array => {
        array.forEach(element => {
            if (!Number.isInteger(element))
                throw new Error('children items should be numbers');
        });
        return true;
    })
];

exports.validateClassId = [
    body("_id").isInt().withMessage("Class id should be number")
];

exports.validateIdArray = [
    body("children").isArray().withMessage("children should be array")
    .custom(array => {
        array.forEach(element => {
            if (!Number.isInteger(element))
                throw new Error('children items should be numbers');
        });
        return true;
    })
];