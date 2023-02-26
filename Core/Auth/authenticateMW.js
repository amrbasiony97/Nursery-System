const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        let decodedToken = jwt.verify(
            request.get("authorization").split(" ")[1],
            "iti@123");
        request.body.login_id = decodedToken.login_id;
        request.body.role = decodedToken.role;
        next();
    }
    catch (error) {
        error.status = 401;
        error.message = "Not authenticated";
        next(error);
    }
}

module.exports.checkAdmin = (request, response, next) => {
    if (request.body.role === "admin") {
        next();
    }
    else {
        let error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.checkTeacherAndAdminBody = (request, response, next) => {
    if (request.body.role === "admin" || 
    (request.body.role === "teacher" && request.body.id === request.body.login_id)) {
        next();
    }
    else {
        let error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}

module.exports.checkTeacherAndAdminParam = (request, response, next) => {
    if (request.body.role === "admin" || 
    (request.body.role === "teacher" && request.params.id === request.body.login_id)) {
        next();
    }
    else {
        let error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}