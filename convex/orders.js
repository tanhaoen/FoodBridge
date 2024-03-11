import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addOrders = mutation({
    args: { 
        listings_id : v.number(),
        quantity : v.number(),
        order_status : v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("orders", {
            listings_id : args.listings_id,
            quantity : args.quantity,
            order_status : args.order_status,
        });
    }
});

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

export const deleteOrder = mutation({
    args: { id: v.id("orders") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});