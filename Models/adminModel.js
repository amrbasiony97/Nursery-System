const mongoose = require("mongoose");

// Create schema object
const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

// mapping
mongoose.model("admin", adminSchema);