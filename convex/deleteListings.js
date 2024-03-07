import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteListing = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});