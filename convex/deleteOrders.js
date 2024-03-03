import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteOrder = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});