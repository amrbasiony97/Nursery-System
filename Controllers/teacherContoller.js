exports.getAllTeachers = (request, response) => {
  response.status(200).json({ data: [] });
};

exports.addTeacher = (request, response) => {
  response.status(201).json({ data: "Added Teacher" });
}

exports.updateTeacher = (request, response) => {
  response.status(200).json({ data: "Updated Teacher" });
}

exports.deleteTeacher = (request, response) => {
  response.status(200).json({ data: "Deleted Teacher" });
}