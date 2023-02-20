exports.getAllChildren = (request, response) => {
  response.status(200).json({ data: ['Inside getAllChildren'] });
};

exports.getChild = (request, response) => {
  response.status(200).json({ data: ['Inside getChild'] });
}

exports.addChild = (request, response) => {
  response.status(201).json({ data: "Added" });
};

exports.updateChild = (request, response) => {
  response.status(200).json({ data: "Updated" });
};

exports.deleteChild = (request, response) => {
  response.status(200).json({ data: "Deleted" });
};
