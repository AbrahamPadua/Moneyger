import mongoose from "mongoose";
import defaultCateg from "./defaultCategories";
import category from "./category";
import transaction from "./transaction";
import goal from "./goal";
import budget from "./budget";

const user = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required."],
  },
  lastName: {
    type: String,
    required: [true, "last name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  mobileNo: {
    type: String,
    // required: [true, "mobile number is required."],
  },
  password: {
    type: String,
    // required: [true, "password is required."],
  },
  loginType: {
    type: String,
    required: [true, "login type is required."],
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [category],
    default: defaultCateg,
  },
  transactions: [transaction],
  goals: [goal],
  budgets: [budget],
});

export default mongoose.model("User", user);
