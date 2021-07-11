import User from "../../models/user";

const transactionResolver = {
  getTransaction: async ({ userId, transactionId }) => {
    const user = await User.findById(userId);
    const { transactions: Ts } = user
    for (let [i, T] of Ts.entries()) {
      // ? GRAPHQL ID IS STRING DATA TYPE
      if (`${T._id}` === transactionId) {
        if (Ts.length === 1) return [T] // IF USER HAS ONLY ONE TRANSACT
        switch (i) {
          case 0: return [T, Ts[i + 1]] // IF IT'S THE OLDEST TRANSACT
          case (Ts.length - 1): return [Ts[i - 1], T] // IF IT'S THE LATEST TRANSACT
          default: return [Ts[i - 1], T, Ts[i + 1]]
        }
      };
    }
    return false;
  },
  getTransactions: async ({ userId }) => {
    const user = await User.findById(userId);

    return user.transactions;
  },
  addTransaction: async ({ userId, input }) => {
    try {
      const user = await User.findById(userId);
      if (input.category.type === "Income")
        input.balanceAfterTransaction = user.currentBalance + input.amount;
      if (input.category.type === "Expense")
        input.balanceAfterTransaction = user.currentBalance - input.amount;
      user.transactions.push(input);
      user.currentBalance = input.balanceAfterTransaction;
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
      const newTrans = user.transactions.filter(
        (T) => `${T._id}` !== transactionId
      );
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
