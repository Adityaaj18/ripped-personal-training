//import { verify } from "crypto";
import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";
// import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
