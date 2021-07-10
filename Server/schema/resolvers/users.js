import User from "../../models/user";

const userResolver = {
  getUsers: async () => {
    return await User.find({})
  },

  getUser: async ({ userId }) => {
    return await User.findById(userId)
  },

  editUser: async ({ userId, changes }) => {
    return await User.findByIdAndUpdate(userId, changes)
  },

  delUser: async ({ userId }) => {
    return await User.findByIdAndDelete(userId)
  }
};

export default userResolver;
