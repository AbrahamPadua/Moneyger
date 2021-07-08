import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  buildSchema,
} from "graphql";

const schema = buildSchema(`
  # scalar Date {
    
  # }

  # Schema for each user
  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String
    loginType: String!
    currentBalance: Int!
    tokenVersion: Int!
    categories: [Category]
    transactions: [Transaction]
    budgets: [Budget]
    goals: [Goal]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    loginType: String!
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
    dateAdded: String
  }

  input TransactionInput {
    category: CategoryInput!
    amount: Int!
    description: String
    balanceAfterTransaction: Int!
  }

  # Predefined and user-defined categories
  type Category {
    id: ID,
    name: String!
    type: CategoryType!
    icon: Icon
  }

  enum CategoryType {
    INCOME
    EXPENSE
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
    name: String!
    color: String!
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
    name: String!
    category: CategoryInput
    description: String
    amount: Int
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
    getUser(id: ID!): User
    getUsers: [User]
    # Category Query
    getCategories: [Category]
    # Transaction Queries
    getTransaction(userId: ID!, transactionId: ID!): Transaction
    getTransactions(userId: ID!): [Transaction]
    # LoggedIn Queries
    getLoggedIns: [LoggedIn]
    isLoggedIn(input: LoggedInInput): Boolean
  }

  type Mutation {
    # User Mutations
    newUser(input: UserInput): Boolean
    updateUser(id: ID, transaction: TransactionInput): Boolean
    deleteUser(id: ID): Boolean
    # Category Mutations
    addCategory(input: CategoryInput): Boolean
    # Transaction Mutations
    addTransaction(userId: ID!, transaction: TransactionInput): Boolean
    deleteTransaction(userId: ID!, transactionId: ID!): Boolean
    # LoggedIn Mutations
    newLoggedIn(input: LoggedInInput) : Boolean
    delLoggedIn(input: LoggedInInput) : Boolean
  }
`);

export default schema;
