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

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Bank = mongoose.model("Bank", bankSchema);

module.exports = { User, Bank };
