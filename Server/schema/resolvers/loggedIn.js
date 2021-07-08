import LoggedIn from "../../models/loggedIn";

const loggedInResolver = {
  getLoggedIns: async () => {
    return await LoggedIn.find({});
  },
  isLoggedIn: async ({ input }) => {
    return await LoggedIn.exists(input);
  },
  newLoggedIn: async ({ input: { refresh_token, userId } }) => {
    const newLog = new LoggedIn({ refresh_token, userId });
    await newLog.save();
    return true;
  },
  delLoggedIn: async ({ input: { refresh_token } }) => {
    const exists = await LoggedIn.findOne({ refresh_token });
    if (exists) {
      await LoggedIn.deleteOne({ refresh_token });
      return true;
    } else {
      false;
    }
  },
};

export default loggedInResolver;
