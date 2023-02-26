const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");
require("../Models/teacherModel");
require("../Models/classModel");
const ClassSchema = mongoose.model("class");
const saltRounds = 10;

const TeacherSchema = mongoose.model("teachers");

exports.getAllTeachers = (request, response, next) => {
  TeacherSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getTeacher = (request, response, next) => {
  TeacherSchema.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
}

exports.addTeacher = (request, response, next) => {
  request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
  const imagePath = (request.file === undefined) ? null : request.file.path;
  new TeacherSchema({
    _id: new mongoose.Types.ObjectId(),
    fullname: request.body.fullname,
    email: request.body.email,
    password: request.body.password,
    image: imagePath
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateTeacher = (request, response, next) => {
  let imagePath = (request.file === undefined) ? null : request.file.path;
  if (request.body.password !== undefined)
    request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
  TeacherSchema.findOne({ _id: request.body.id }, { image: 1 })
    .then((data) => {
      if (data.image !== null) {
        if (imagePath === null)
          imagePath = data.image;
        else {
          fs.unlink(data.image, (error) => {
            console.log(error);
            return;
          });
        }
      }
      return TeacherSchema.updateOne(
        {
          _id: request.body.id,
        },
        {
          $set: {
            fullname: request.body.fullname,
            email: request.body.email,
            password: request.body.password,
            image: imagePath
          },
        }
      )
    })
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Teacher not found"));
      else response.status(200).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteTeacher = (request, response, next) => {
  TeacherSchema.findById({ _id: request.body.id })
    .then((data) => {
        if (data !== null && data.image !== null) {
          fs.unlink(data.image, (error) => {
            console.log(error);
            return;
          });
        }
      return TeacherSchema.deleteOne({
        _id: request.body.id,
      });
    })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Teacher not found"));
      else {
        return ClassSchema.updateOne(
          {
            supervisor: request.body.id,
          },
          {
            $unset: {
              supervisor: 1,
            },
          }
        );
      }
    })
    .then((data) => {
      if (data != undefined) {
        if (data.matchedCount == 0)
          response.status(200).json({ data: "Deleted" });
        else
          response
            .status(200)
            .json({ data: "Deleted and Updated corresponding class" });
      }
      else
        next();
    })
    .catch((error) => {
      next(error);
    });
};
