import { query } from "./_generated/server";
import { v } from "convex/values";

export const queryOrders = query({
  args: {
    column: v.string(), 
    input : v.any()
  },
  handler: async (ctx, args) => {
    // return all listings 
    //const listings = await ctx.db.query("listings").collect();

    // observe that listings is of type object

    //return listings.categories.collect();
    
    // return listing with input column and value
    const order = await ctx.db.query("orders").filter(
      (q) => (q.eq(q.field(args.column), args.input))).collect();

    return order;

    }
});
