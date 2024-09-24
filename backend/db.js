const mongoose = require("mongoose");

mongoose.connect(
  ""
);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  username: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
