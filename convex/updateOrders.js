import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateOrders = mutation({
    //parameters for the mutation
  args: { 
    id: v.id("orders"),
    column: v.string(),
    input : v.any()
    },

    //handler for the mutation
  handler: async (ctx, args) => {
    const { id } = args;
    
    //before change
    console.log(await ctx.db.get(id));

    // after change:
    await ctx.db.patch(id, {[args.column]: args.input});
    console.log(await ctx.db.get(id));

  },
});