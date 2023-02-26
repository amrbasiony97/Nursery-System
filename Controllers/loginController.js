const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const AdminSchema = mongoose.model("admin");
const TeacherSchema = mongoose.model("teachers");

exports.login = (request, response, next) => {
    // Check if the user is the admin
    AdminSchema.findOne({})
        .then((data) => {
            if (request.body.username === data.username && 
                bcrypt.compareSync(request.body.password, data.password)) {
                let token = getToken(data, "admin");
                response.status(200).json({ message: "Admin Authenticated", token });
            }
            else if (request.body.email) {
                // Check if the user is a teacher
                return TeacherSchema.findOne({
                    email: request.body.email
                })
            }
            else {
                let error = new Error("Authentication failed");
                error.status = 401
                next(error);
            }
        })
        .then((data) => {
            if (data != null && request.body.email === data.email && 
                bcrypt.compareSync(request.body.password, data.password)) {
                let token = getToken(data, "teacher");
                response.status(200).json({ message: "Teacher Authenticated", token });
            } else {
                let error = new Error("Authentication failed");
                error.status = 401
                next(error);
            }
        })

        .catch((error) => {
            next(error);
        })
}

function getToken(user, _role) {
    return jwt.sign({
        login_id: user._id,
        role: _role
    }, "iti@123", { expiresIn: "1h" });
}