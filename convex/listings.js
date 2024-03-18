import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ USED FUNCTIONS ============

export const queryListings = query({
  args: {
    user_id: v.id("users"),
    search_query: v.optional(v.string())
  },
  handler: async (ctx, args) => {

    let queryBuilder = ctx.db.query("listings").filter((q) => q.neq(q.field("seller_id"), args.user_id));

    if (args.search_query !== undefined && args.search_query !== null && args.search_query !== "") {
      queryBuilder = queryBuilder.withSearchIndex("by_title", (q) => q.search("title", args.search_query));
    }

    const listings = await queryBuilder.collect();

    console.log(listings);

    const results = await Promise.all(listings.map(async (listing) => {
      const user = await ctx.db.get(listing.seller_id);

      // console.log(user);

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

export const addListings = mutation({
  args: {
    title: v.string(), 
    description: v.string(), 
    seller_id: v.id("users"),
    price: v.number(),
    quantity: v.number(),
    expiry_time: v.number(),
    categories: v.array(v.string()), //list in alphabetical order
    thumbnail_url: v.string(),
    location: v.object({
      latitude: v.number(),
      longitude: v.number()
    })
  },
  handler: async (ctx, args) => {
    // insert a new document into the listings table
    return await ctx.db.insert("listings", {
      title: args.title,
      description: args.description,
      seller_id: args.seller_id,
      price: args.price,
      quantity: args.quantity,
      expiry_time: args.expiry_time,
      categories: args.categories,
      thumbnail_url: args.thumbnail_url,
      address: args.address,
      location: args.location
    });
  }
});

// ============ UNUSED FUNCTIONS ============

export const updateListings = mutation({
    //parameters for the mutation
  args: { 
    id: v.id("listings"),
    column: v.string(),
    input : v.number()
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