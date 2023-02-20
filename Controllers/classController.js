exports.getAllClasses = (request, response) => {
  response.status(200).json({ data: ['Inside getAllClasses'] });
};

exports.getClassChildren = (request, response) => {
  response.status(200).json({ data: ['Inside getClassChildren'] });
}

exports.getClass = (request, response) => {
  response.status(200).json({ data: ['Inside getClass'] });
}

exports.getClassSupervisor = (request, response) => {
  response.status(200).json({ data: ['Inside getClassSupervisor'] });
}

exports.addClass = (request, response) => {
  response.status(201).json({ data: "Class Added" });
};

exports.updateClass = (request, response) => {
  response.status(200).json({ data: "Class Updated" });
};

exports.deleteClass = (request, response) => {
  response.status(200).json({ data: "Class Deleted" });
};
