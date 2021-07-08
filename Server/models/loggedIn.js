import mongoose from "mongoose";

const loggedIn = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: [true, "Refresh token is required."],
  },
  userId: {
    type: String,
    required: [true, "User ID is required."],
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("LoggedIn", loggedIn);
