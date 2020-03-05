const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
});

const DBUser = mongoose.model("DBUser", userSchema);

module.exports = DBUser;
