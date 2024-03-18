import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ USED FUNCTIONS ============
export const queryUsers = query({
    args: {
      username: v.string()
    },
    handler: async (ctx, args) => {
      
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("username"), args.username))
          .first();
        return {
            _id: user._id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            level: user.level,
            verified: user.verified
        };
    }
});

export const getUserID = query({
    args: {
      first_name: v.optional(v.string())
    },
    handler: async (ctx, args) => {
      
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("first_name"), args.first_name))
          .first();
        return user._id;
    }
});

export const checkValidUsername = query({
    args: {
      username: v.optional(v.string())
    },
    handler: async (ctx, args) => {

      if (args.username) {
        const user = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("username"), args.username))
          .first();

        return user === null;
      }

      return true;
      
    }
});

export const updateUser = mutation({
    args: {
      id: v.id("users"),
      username: v.string(),
      email: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { username: args.username, email: args.email });
    }
});

export const updateLocation = mutation({
    args: {
      id: v.id("users"),
      latitude: v.number(),
      longitude: v.number()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { location: { latitude: args.latitude, longitude: args.longitude } });
    }
});