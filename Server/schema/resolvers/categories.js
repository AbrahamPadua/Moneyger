import User from "../../models/user";

const categoryResolver = {
  getCategory: async ({ userId, categoryId }) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        categ = user.categories.find((C) => C._id === categoryId);
        return categ;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getCategories: async ({ userId }) => {
    try {
      const user = await User.findById({ userId });
      if (user) return user.categories;
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  addCategory: async ({ userId, input }) => {
    try {
      const user = await User.findById(userId);
      // Check if category already exists
      let v = user.categories.find(
        (C) => C.name.toLowerCase() === input.name.toLowerCase()
      );
      if (!v) return false;
      user.categories.push(input);
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  editCategory: async ({ userId, categoryId, input }) => {
    try {
      const user = User.findById(userId);
      for (let categ of user.categories) {
        if (categ._id === categoryId) {
          categ = { ...categ, ...input };
          await user.save();
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  delCategory: async ({ userId, categoryId }) => {
    try {
      const user = await User.findById(userId);
      const newCategs = user.categories.filter((C) => C._id !== categoryId);
      if (newCategs.length === user.categories.length) return false
      user.categories = newCategs
      await user.save()
      return true;
    } catch (err) {
      console.log(err)
      return false
    }
  },
};

export default categoryResolver;
