const category = {
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
  type: {
    type: String,
    required: [true, "Category type is required."],
  },
  icon: {
    name: {
      type: String,
      required: [true, "Icon name is required"],
    },
    color: {
      type: String,
      required: [true, "Icon color is required"],
    },
  },
};

export default category;
