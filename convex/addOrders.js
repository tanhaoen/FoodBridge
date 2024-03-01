import { v } from "convex/values";
import { mutation } from "./_generated/server";

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