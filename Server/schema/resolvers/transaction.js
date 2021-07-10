import User from "../../models/user";

const transactionResolver = {
  getTransaction: async ({ userId, transactionId }) => {
    const user = await User.findById(userId);
    for (let transaction of user.transactions) {
      // GRAPHQL ID IS STRING DATA TYPE
      if (`${transaction._id}` === transactionId) return transaction;
    }
    return false;
  },
  getTransactions: async ({ userId }) => {
    const user = await User.findById(userId);
    console.log(user.transactions)
    return user.transactions;
  },
  addTransaction: async ({ userId, input }) => {
    try {
      const user = await User.findById(userId);
      user.transactions.push(input);
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  editTransaction: async ({ userId, transactionId, input }) => {
    try {
      const user = await User.findById(userId);
      for (let transaction of user.transactions) {
        if (`${transaction._id}` === transactionId) {
          transaction = { ...transaction, ...input };
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
  deleteTransaction: async ({ userId, transactionId }) => {
    try {
      const user = await User.findById(userId);
      const newTrans = user.transactions.filter((T) => `${T._id}` !== transactionId);
      if (newTrans.length === user.transactions.length) return false;
      user.transactions = newTrans;
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default transactionResolver;
