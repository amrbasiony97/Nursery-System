const mongoose = require("mongoose");

// Create schema object
const childSchema = new mongoose.Schema({
    _id: Number,
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    address: Object
})

// mapping
mongoose.model("children", childSchema);