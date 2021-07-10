import User from "../../models/user";

const budgetResolver = {
  getBudget: async ({ userId, budgetId }) => {
    const user = await User.findById(userId)
    for (let budget of user.budgets) {
      if (budget._id === budgetId) return budget
    }
    return false;
  },
  getBudgets: async ({ userId }) => {
    const user = await User.findById(userId)
    return user.budgets
  },
  addBudget: async ({ userId, input }) => {
    try {
      const user = await User.findById(userId)
      user.budgets.push(input)
      await user.save()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  editBudget: async ({ userId, budgetId, input }) => {
    try {
      const user = await User.findById(userId)
      for (let budget of user.budgets) {
        if (budget._id === budgetId) {
          budget = { ...budget, ...input }
          await user.save()
          return true
        }
      }
      return false
    } catch (err) {
      console.log(err)
      return false
    }
  },
  delBudget: async ({ userId, budgetId }) => {
    try {
      const user = await User.findById(userId)
      newBudget = user.budgets.filter(B => B._id !== budgetId)
      if (newBudget.length === user.budgets.length) return false
      user.budgets = newBudget
      await user.save()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default budgetResolver