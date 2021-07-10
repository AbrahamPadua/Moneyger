import category from "./category";

const transaction = {
  category,
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
};

export default transaction;
