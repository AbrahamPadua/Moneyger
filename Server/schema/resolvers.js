import loggedInResolver from "./resolvers/loggedIn";

const resolvers = {
  // getUser,
  // getUsers,
  // getCategories,
  ...loggedInResolver,
};

export default resolvers;
