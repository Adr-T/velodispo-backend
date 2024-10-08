const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "rides" }] || [],
  stats: [{ type: mongoose.Schema.Types.ObjectId, ref: "stats" }] || [],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
