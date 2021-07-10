import User from "../../models/user";

const goalResolver = {
  getGoal: async ({ userId, goalId }) => {
    const user = await User.findById(userId)
    return user.find(G => `${G._id}` === goalId)
  },
  getGoals: async ({ userId }) => {
    const user = await User.findById(userId)
    return user.goals
  },
  addGoal: async ({ userId, input }) => {
    try {
      const user = user.findById(userId)
      user.goals.push(input)
      await user.save()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  editGoal: async ({ userId, goalId, input }) => {
    try {
      const user = User.findById(userId)
      for (let goal of user.goals) {
        if (`${goal._id}` === goalId) {
          goal = { ...goal, ...input }
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
  delGoal: async ({ userId, goalId }) => {
    try {
      const user = User.findById(userId)
      newGoals = user.goals.filter(G => `${G._id}` !== goalId)
      if (newGoals.length === user.goals.length) return false
      user.goals = newGoals
      await user.save()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default goalResolver