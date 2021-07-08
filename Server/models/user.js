import mongoose from "mongoose";
import defaultCateg from "./defaultCategories";

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
    type: [
      {
        name: {
          type: String,
          required: [true, "Category name is required."],
        },
        type: {
          type: String,
          required: [true, "Category type is required."],
        },
        icon: {
          type: String,
          required: [true, "Icon name is required"],
        },
        iconColor: {
          type: String,
          required: [true, "Icon color is required"],
        },
      },
    ],
    default: defaultCateg,
  },
  transactions: [
    {
      categoryName: {
        type: String,
        required: [true, "Transaction category is required."],
      },
      type: {
        type: String,
        required: [true, "Transaction Type is required."],
      },
      amount: {
        type: Number,
        required: [true, "Transaction amount is required."],
      },
      description: {
        type: String,
        default: null,
      },
      balanceAfterTransaction: {
        type: Number,
        required: [true, "Balance is required."],
      },
      dateAdded: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  goals: [
    {
      goalName: {
        type: String,
        required: [true, "Goal name is required"],
      },
      description: {
        type: String,
        required: false,
      },
      categoryName: {},
      amount: {},
    },
  ],
  budgets: [
    {
      categoryName: {
        type: String,
        required: [true, "Category Name is required"],
      },
      amount: {
        type: Number,
        required: [true, "Amount is required."],
      },
    },
  ],
});

export default mongoose.model("User", user);
