const { body, param } = require("express-validator");

exports.validatePostArray = [
    // body("id").isInt().withMessage("Class id should be number"),
    body("name").isAlphanumeric().withMessage("name should contain only letters and numbers"),
    body("supervisor").isMongoId().withMessage("supervisor id should be mongo id"),
    body("children").isArray().withMessage("children should be array of numbers"),
    body("children.*").isInt().withMessage("children items should be numbers")
    // .custom(array => {
    //     array.forEach(element => {
    //         if (!Number.isInteger(element))
    //             throw new Error('children items should be numbers');
    //     });
    //     return true;
    // })
];

exports.validatePatchArray = [
    body("id").isInt().withMessage("Class id should be number"),
    body("name").optional().isAlphanumeric().withMessage("name should contain only letters and numbers"),
    body("supervisor").optional().isMongoId().withMessage("supervisor id should be mongo id"),
    body("children").optional().isArray().withMessage("children should be array of numbers"),
    body("children.*").optional().isInt().withMessage("children items should be numbers")
    // .custom(array => {
    //     array.forEach(element => {
    //         if (!Number.isInteger(element))
    //             throw new Error('children items should be numbers');
    //     });
    //     return true;
    // })
];

exports.validateClassId = [
    body("id").isInt().withMessage("Class id should be number")
];

exports.validateClassIdParam = [
    param("id").isInt().withMessage("Class id should be number")
];

exports.validateIdArray = [
    body("children").isArray().withMessage("children should be array"),
    body("children.*").isInt().withMessage("children items should be numbers")
    // .custom(array => {
    //     array.forEach(element => {
    //         if (!Number.isInteger(element))
    //             throw new Error('children items should be numbers');
    //     });
    //     return true;
    // })
];