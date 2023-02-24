const mongoose = require("mongoose");

// Create schema object
const teacherSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: String
})

// mapping
mongoose.model("teachers", teacherSchema);