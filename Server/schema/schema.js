import { buildSchema } from "graphql";
import dateScalar from "./gqlDate";

const schema = buildSchema(`
  scalar Date

  # Schema for each user
  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String
    loginType: String!
    currentBalance: Int
    tokenVersion: Int
    categories: [Category]
    transactions: [Transaction]
    budgets: [Budget]
    goals: [Goal]
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    loginType: String
    categories: [CategoryInput]
    transactions: [TransactionInput]
    goals: [GoalInput]
    budgets: [BudgetInput]
  }

  # Each transactions of a user
  type Transaction {
    id: ID
    name: String!
    category: Category!
    amount: Int!
    description: String
    balanceAfterTransaction: Int!
    dateAdded: Date
  }

  input TransactionInput {
    category: CategoryInput
    amount: Int
    description: String
    balanceAfterTransaction: Int
  }

  # Predefined and user-defined categories
  type Category {
    id: ID,
    name: String!
    type: CategoryType!
    icon: Icon!
  }

  enum CategoryType {
    Income
    Expense
  }

  input CategoryInput {
    name: String
    type: CategoryType
    icon: IconInput
  }

  # Icons for Categories
  type Icon {
    name: String!
    color: String!
  }

  input IconInput {
    name: String
    color: String
  }

  # Goals of the User
  type Goal {
    id: ID
    name: String!
    description: String
    amount: Int!
  }

  input GoalInput {
    name: String!
    description: String
    amount: Int!
  }

  # Budget
  type Budget {
    id: ID
    name: String!
    category: Category
    amount: Int
    description: String
  }

  input BudgetInput {
    name: String
    category: CategoryInput
    description: String
    amount: Int
  }

  type Quote {
    id: ID
    quote: String!,
    author: String!
  }

  # logged in users
  type LoggedIn {
    refresh_token: ID!
    userId: ID!
  }

  input LoggedInInput {
    refresh_token: ID
    userId: ID
  }


  type Query {
    # User Queries
    getUser(userId: ID!): User
    getUsers: [User]

    # Category Query
    getCategory(userId: ID!, categoryId: ID!): Category
    getCategories(userId: ID!): [Category]

    # Transaction Queries
    getTransaction(userId: ID!, transactionId: ID!): Transaction
    getTransactions(userId: ID!): [Transaction]

    # Budget Queries
    getBudget(userId: ID!, budgetId: ID!): Budget 
    getBudgets(userId: ID!): [Budget]

    # Goal Queries
    getGoal(userId: ID!, goalId: ID!): Goal
    getGoals(userId: ID!): [Goal]

    # Quote Query
    getQuote: Quote

    # LoggedIn Queries
    getLoggedIns: [LoggedIn]
    getLoggedIn(userId: ID!): LoggedIn
  }


  type Mutation {
    # User Mutations
    editUser(userId: ID, transaction: TransactionInput): Boolean
    delUser(userId: ID): Boolean

    # Category Mutations
    addCategory(userId: ID!, input: CategoryInput): Boolean
    editCategory(userId: ID!, categoryId: ID!, input: CategoryInput): Boolean
    delCategory(userId: ID!, categoryId: ID!): Boolean

    # Transaction Mutations
    addTransaction(userId: ID!, input: TransactionInput): Boolean
    editTransaction(userId: ID!, transactionId: ID!, input: TransactionInput): Boolean
    delTransaction(userId: ID!, transactionId: ID!): Boolean

    # Budget Mutations
    addBudget(userId: ID!, input: BudgetInput): Boolean
    editBudget(userId: ID!, input: BudgetInput): Boolean
    delBudget(userId: ID!, budgetId: ID!): Boolean

    # Goal Mutations
    addGoal(userId: ID!, input: GoalInput): Boolean
    editGoal(userId: ID!, goalId: ID!, input: GoalInput): Boolean
    delGoal(userId: ID!, goalId: ID!): Boolean

    # LoggedIn Mutations
    newLoggedIn(input: LoggedInInput) : Boolean
    delLoggedIn(input: LoggedInInput) : Boolean
  }
`);

Object.assign(schema._typeMap.Date, dateScalar);

export default schema;
