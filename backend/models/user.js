const mongoose = require("mongoose"); // On importe Mongoose toujours
const uniqueValidator = require("mongoose-unique-validator"); // On require Unique validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // On l'applique à notre schéma

module.exports = mongoose.model("user", userSchema);
