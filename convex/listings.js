import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
      filters: v.optional(v.array(v.object({
        field: v.string(),
        value: v.any(),
      }))),
      sort_by: v.optional(v.object({
        field: v.string(),
        order: v.string(),
      })),
    },
    handler: async (ctx, args) => {
      // return listing with input column and value
      if (args.filters || args.sorters) {
        // Return listings with the specified column and value
        let queryBuilder = await ctx.db.query("listings");

        if (args.sorters) {
          const sorters = args.sorters;

          sorters.forEach((sorter) => {
            const index = `by_${sorter.field}`;
            queryBuilder = queryBuilder.withIndex(index).order(sorter.order);
          })
        }

        if (args.filters) {
          const filters = args.filters;

          console.log(filters);

          filters.forEach((filter) => {
            queryBuilder = queryBuilder.filter((q) => q.eq(q.field(filter.field), filter.value));
          })
        }

        const listings = await queryBuilder.collect();

        return listings

      } else {
        // Return all listings if no column is specified
        const listings = await ctx.db.query("listings").collect();
  
        return listings;
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