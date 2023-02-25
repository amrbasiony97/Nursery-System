const multer = require("multer");
const path = require("path");

module.exports = (request, response, next) => {
  multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, path.join(__dirname, "..", "..", "Images"));
      }, // Set the destination to the Images folder
      filename: (request, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
      }, // Set the filename to the current epoch time (to be unique)
    }),
    fileFilter: (request, file, callback) => {
      if (file.mimetype.startsWith("image/")) callback(null, true);
      else
        callback(
          new Error("Invalid file type, only images are allowed"),
          false
        );
    }, // Set the file filter to only accept images
    limits: {
      fileSize: 1024 * 1024, // Limits the file size to 1MB
    },
  }).single("image")(request, response, (error) => {
    if (error) {
      next(error);
    } else {
      next();
    }
  });
};
