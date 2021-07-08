import mongoose from "mongoose";

const quote = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, "Quote is required"],
  },
  author: {
    type: String,
    required: [true, "Quote author is required."],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Quote", quote);
