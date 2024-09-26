const mongoose = require("mongoose");

mongoose.connect("");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    requred: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    uniqure: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
