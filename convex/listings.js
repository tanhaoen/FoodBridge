import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addListings = mutation({
  args: {
    title: v.string(), 
    description: v.string(), 
    provider_name: v.string(), 
    verified_provider: v.boolean(), 
    price: v.number(), 
    quantity: v.number(), 
    expiry_time: v.number(),
    categories: v.array(v.string()), //list in alphabetical order
    thumbnail_url: v.string(), 
    address: v.string()
  },
  handler: async (ctx, args) => {
    // insert a new document into the listings table
    return await ctx.db.insert("listings", {
      title: args.title,
      description: args.description,
      provider_name: args.provider_name,
      verified_provider: args.verified_provider,
      price: args.price,
      quantity: args.quantity,
      expiry_time: args.expiry_time,
      categories: args.categories,
      thumbnail_url: args.thumbnail_url,
      address: args.address
    });
  }
});

export const queryListings = query({
    args: {
      column: v.optional(v.string()), 
      input : v.optional(v.any())
    },
    handler: async (ctx, args) => {
      // return all listings 
      //const listings = await ctx.db.query("listings").collect();
  
      // observe that listings is of type object
  
      //return listings.categories.collect();
      
      // return listing with input column and value
      if (args.column) {
        // Return listings with the specified column and value
        const listing = await ctx.db
          .query("listings")
          .filter((q) => q.eq(q.field(args.column), args.input))
          .collect();
  
        return listing;
      } else {
        // Return all listings if no column is specified
        const allListings = await ctx.db.query("listings").collect();
  
        return allListings;
      }
    }
});

export const updateListings = mutation({
    //parameters for the mutation
  args: { 
    id: v.id("listings"),
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

export const deleteListing = mutation({
    args: { id: v.id("listings") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });