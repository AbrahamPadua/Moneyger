const budget = {
  categoryName: {
    type: String,
    required: [true, "Category Name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
  },
};

export default budget;
