import {  mutation, query } from "./_generated/server";
import { v } from "convex/values"

export const resetOrderNumber = mutation(async (ctx) => {
    await ctx.db.patch("kh79ct164m3ejwbqcegn9wwg9s6ndnp7", {order_number : 0})
})

export const getOrderNumber = query({
    args: {},
    handler: async (ctx) => {
      const result = await ctx.db.query("order_number").collect();
      return result[0].order_number;
    },
});

export const incrementOrderNumber = mutation({
    args: {
        id: v.id("order_number"),
        num: v.number()
    },
    handler: async (ctx, args) => {
        const { id } = args;
        
        // Before change
        console.log(await ctx.db.get(id))
        
        const newNum = args.num + 1
        await ctx.db.patch(id, {"order_number": newNum})

        // After change
        console.log(await ctx.db.get(id))
    }
})
