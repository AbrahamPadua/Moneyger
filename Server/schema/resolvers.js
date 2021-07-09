import loggedInResolver from "./resolvers/loggedIn";
import userResolver from "./resolvers/users";

const resolvers = {
  // getUser,
  // getUsers,
  // getCategories,
  ...loggedInResolver,
  ...userResolver
};

export default resolvers;
