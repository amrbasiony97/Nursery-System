const mongoose = require("mongoose");
require("../Models/classModel");
const ClassSchema = mongoose.model("class"),
      ChildSchema = mongoose.model("children"),
      TeacherSchema = mongoose.model("teachers");

exports.getAllClasses = (request, response, next) => {
  ClassSchema.find({})
    .populate({ path: "supervisor", select: "fullname email" }).populate({ path: "children", select: "fullname age level" })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    })
};

exports.getClassChildren = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "children" })
    .then((data) => {
      response.status(200).json({ children: data.children });
    })
    .catch((error) => {
      next(error);
    });
}

exports.getClass = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "supervisor", select: "fullname email" }).populate({ path: "children", select: "fullname age level" })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    })
}

exports.getClassSupervisor = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "supervisor" })
    .then((data) => {
      response.status(200).json({ supervisor: data.supervisor });
    })
    .catch((error) => {
      next(error);
    });
}

exports.addClass = (request, response, next) => {
  TeacherSchema.findOne({ _id: request.body.supervisor }, { _id: 1})
    .then((data) => {
      if (data == null)
        next(new Error("Supervisor not found"));
      else
        return ChildSchema.find({ _id: { $in: request.body.children } });
    })
    .then((array) => {
      if (array.length != request.body.children.length)
        next(new Error(`${request.body.children.length - array.length} children not found`));
      else
        return new ClassSchema({
          name: request.body.name,
          supervisor: request.body.supervisor,
          children: request.body.children
        }).save()
    })
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateClass = (request, response, next) => {
  TeacherSchema.findOne({ _id: request.body.supervisor }, { _id: 1})
    .then((data) => {
      if (request.body.supervisor !== undefined && data == null)
        next(new Error("Supervisor not found"));
      else
        return ChildSchema.find({ _id: { $in: request.body.children } });
    })
    .then((array) => {
      if (request.body.children !== undefined && array.length != request.body.children.length)
        next(new Error(`${request.body.children.length - array.length} children not found`));
      else
        return ClassSchema.updateOne(
          {
            _id: request.body.id,
          },
          {
            $set: {
              name: request.body.name,
              supervisor: request.body.supervisor,
              children: request.body.children
            },
          }
        )
    })
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Class not found"));
      else response.status(200).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteClass = (request, response, next) => {
  ClassSchema.deleteOne({
    _id: request.body.id,
  })
    .then((data) => {
      if (data.deletedCount == 0) next(new Error("Class not found"));
      else response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
