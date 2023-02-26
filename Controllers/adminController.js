const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../Models/adminModel");
const saltRounds = 10;

const AdminSchema = mongoose.model("admin");

exports.getAdmin = (request, response, next) => {
  AdminSchema.findOne({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateAdmin = (request, response, next) => {
  if (request.body.password !== undefined)
    request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
  AdminSchema.updateOne(
    {},
    {
      $set: {
        username: request.body.username,
        password: request.body.password,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data: "Admin data updated successfully" });
    })
    .catch((error) => {
      next(error);
    });
};
