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
    categories: v.array(v.string()), 
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