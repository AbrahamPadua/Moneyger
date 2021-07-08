import User from "../../models/user";

const transactionResolver = {
  getTransaction: async ({ userId, transactionId }) => {
    const user = await User.findById(userId);
    for (let transaction of user.transactions) {
      console.log(transaction);
      if (transaction["_id"] === transactionId) return transaction;
    }
  },
  getTransactions,
  addTransaction,
  deleteTransaction,
};

export default transactionResolver;
