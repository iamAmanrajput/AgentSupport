import { query, mutation } from "./_generated/server"

// Get all users
export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()

    return users
  },
})

// Add a new user
export const add = mutation({
  args: {},
  handler: async (ctx) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity()

    // Check authentication
    if (identity === null) {
      throw new Error("Not authenticated")
    }

    // Get organization ID
    const orgId = identity.orgId as string

    // Check organization
    if (!orgId) {
      throw new Error("Missing organization")
    }

    // Test error tracking
    // throw new Error("Tracking test")

    // Insert user
    const userId = await ctx.db.insert("users", {
      name: "Antonio",
    })

    return userId
  },
})
