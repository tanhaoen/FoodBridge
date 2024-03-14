import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const queryAccounts = query({
    args: {
      username: v.string()
    },
    handler: async (ctx, args) => {
      
        const account = await ctx.db
          .query("accounts")
          .filter((q) => q.eq(q.field("username"), args.username))
          .first();
        return {
            _id: account._id,
            username: account.username,
            firstName: account.first_name,
            lastName: account.last_name,
            email: account.email,
            level: account.level,
            verified: account.verified
        };
    }
});

export const checkValidUsername = query({
    args: {
      username: v.optional(v.string())
    },
    handler: async (ctx, args) => {

      if (args.username) {
        const account = await ctx.db
          .query("accounts")
          .filter((q) => q.eq(q.field("username"), args.username))
          .first();

        return account === null;
      }

      return true;
      
    }
});

export const updateAccount = mutation({
    args: {
      id: v.id("accounts"),
      username: v.string(),
      email: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { username: args.username, email: args.email });
    }
});