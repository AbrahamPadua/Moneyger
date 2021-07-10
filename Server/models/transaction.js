import category from "./category";

const transaction = {
  category,
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
};

export default transaction;
