import loggedInResolver from "./resolvers/loggedIn";
import userResolver from "./resolvers/users";
import categoryResolver from "./resolvers/categories"
import transactionResolver from "./resolvers/transaction"
import budgetResolver from "./resolvers/budgets";
import goalResolver from "./resolvers/goals";

const resolvers = {
  ...loggedInResolver,
  ...userResolver,
  ...categoryResolver,
  ...transactionResolver,
  ...budgetResolver,
  ...goalResolver
};

export default resolvers;
