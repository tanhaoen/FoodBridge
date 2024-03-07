import { query } from "./_generated/server";
import { v } from "convex/values";

export const queryListings = query({
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
    const listing = await ctx.db.query("listings").filter(
      (q) => (q.eq(q.field(args.column), args.input))).collect();

    return listing;

      
  }
});
