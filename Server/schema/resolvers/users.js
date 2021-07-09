import User from "../../models/user";

const userResolver = {
  getUsers: async () => {
    return await User.find({})
  },

  getUser: async ({ id }) => {
    return await User.findById(id)
  },

  editUser: async ({ id, changes }) => {
    return await User.findByIdAndUpdate(id, changes)
  },

  delUser: async ({ id }) => {
    return await User.findByIdAndDelete(id)
  }
};

export default userResolver;
