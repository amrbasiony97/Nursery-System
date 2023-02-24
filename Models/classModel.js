const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// Create schema object
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", unique: true },
  children: [{ type: Number, ref: "children", unique: true }]
});

classSchema.plugin(autoIncrement.plugin, "class");

// mapping
mongoose.model("class", classSchema);
