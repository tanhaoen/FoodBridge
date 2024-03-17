import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ USED FUNCTIONS ============

export const queryListings = query({
  args: {
    user_id: v.id("users")
  },
  handler: async (ctx, args) => {
    // return listing with input column and value
    const listings = await ctx.db
      .query("listings")
      .filter((q) => q.neq(q.field("seller_id"), args.user_id))
      .collect();

    //console.log(listings);

    const results = await Promise.all(listings.map(async (listing) => {
      const user = await ctx.db.get(listing.seller_id);

      //console.log(user);

      if (user !== null && user !== undefined) {
          return {
              ...listing,
              seller_name: user.first_name + " " + user.last_name,
              verified: user.verified
            };
        }
    }));

    return results;
  }
});


// ============ UNUSED FUNCTIONS ============
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
    //console.log(await ctx.db.get(id));

    // after change:
    await ctx.db.patch(id, {[args.column]: args.input});
    //console.log(await ctx.db.get(id));

  },
});

export const deleteListing = mutation({
    args: { id: v.id("listings") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });