const mongoose = require("mongoose");
require("../Models/childModel");
require("../Models/classModel");
const ClassSchema = mongoose.model("class");
const ChildSchema = mongoose.model("children");

exports.getAllChildren = (request, response, next) => {
  ChildSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getChild = (request, response, next) => {
  ChildSchema.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addChild = (request, response, next) => {
  new ChildSchema({
    _id: request.body.id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateChild = (request, response, next) => {
  ChildSchema.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        fullname: request.body.fullname,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address,
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Child not found"));
      else response.status(200).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteChild = (request, response, next) => {
  ChildSchema.deleteOne({
    _id: request.body.id,
  })
    .then((data) => {
      if (data.deletedCount == 0)
        next(new Error("Child not found"));
      else {
        return ClassSchema.updateOne({
          children: { $in: [request.body.id] }
        }, {
          $pull: {
            children: request.body.id
          }
        })
      }
    })
    .then((data) => {
      if (data.matchedCount == 0)
        response.status(200).json({ data: "Deleted" });
      else
        response.status(200).json({ data: "Deleted and updated corresponding class" });
    })
    .catch((error) => {
      next(error);
    });
};