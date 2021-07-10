const goal = {
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
};

export default goal;
