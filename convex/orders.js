import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============ USED FUNCTIONS ============
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
      user_id: v.id("users")
    },
    handler: async (ctx, args) => {

        const orders = await ctx.db.query("orders")
            .filter((q) => (q.eq(q.field("seller_id"), args.user_id)))
            .collect();

        const results = await Promise.all(orders.map(async (order) => {
            const listing = await ctx.db.get(order.listings_id);
            const buyer = await ctx.db.get(order.buyer_id);

            if (listing !== undefined && buyer !== undefined) {
                return {
                    buyer_name: buyer.first_name + " " + buyer.last_name,
                    buyer_location: buyer.location,
                    listing_location: listing.location,
                    item: listing.title,
                    quantity: order.quantity
                };
            }
        }));

        return results;

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
        //console.log(await ctx.db.get(id));

        // after change:
        await ctx.db.patch(id, {[args.column]: args.input});
        //console.log(await ctx.db.get(id));

    },
});

export const deleteOrder = mutation({
    args: { id: v.id("orders") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});