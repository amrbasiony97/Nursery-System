const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require("../Models/teacherModel");
require("../Models/classModel");
const ClassSchema = mongoose.model("class");
const saltRounds = 10;

const TeacherSchema = mongoose.model("teachers");

exports.getAllTeachers = (request, response, next) => {
  TeacherSchema.find({})
    .then(data => {
      response.status(200).json({ data });
    })
    .catch(error => {
      next(error);
    });
};

exports.addTeacher = (request, response, next) => {
  request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
  new TeacherSchema({
    _id: new mongoose.Types.ObjectId(),
    fullname: request.body.fullname,
    email: request.body.email,
    password: request.body.password,
    image: request.body.image,
  })
    .save()
    .then(data => {
      response.status(201).json({ data });
    })
    .catch(error => {
      next(error);
    });
};

exports.updateTeacher = (request, response, next) => {
  if (request.body.password !== undefined)
    request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
  
  TeacherSchema.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        fullname: request.body.fullname,
        email: request.body.email,
        password: request.body.password,
        image: request.body.image,
      },
    }
  )
    .then(data => {
      if (data.matchedCount == 0) next(new Error("Teacher not found"));
      else response.status(200).json({ data: "Updated" });
    })
    .catch(error => {
      next(error);
    });
};

exports.deleteTeacher = (request, response, next) => {
  TeacherSchema.deleteOne({
    _id: request.body.id
  })
    .then(data => {
      if (data.deletedCount == 0)
        next(new Error("Teacher not found"));
      else {
        return ClassSchema.updateOne({
          supervisor: request.body.id
        }, {
          $set: {
            supervisor: null
          }
        })
      }
    })
    .then(data => {
      if (data.matchedCount == 0)
        response.status(200).json({ data: "Deleted" });
      else
        response.status(200).json({ data: "Deleted and Updated corresponding class" });
    })
    .catch(error => {
      next(error);
    });
};
