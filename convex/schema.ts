import { defineSchema } from "convex/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the database
export default defineSchema({
    listings: defineTable({
        title: v.string(), 
        description: v.string(), 
        provider_name: v.string(), //index
        verified_provider: v.boolean(), //index
        price: v.number(), //index
        quantity: v.number(), 
        expiry_time: v.number(), //index
        categories: v.array(v.string()), //add in by alphabetical order 
        thumbnail_url: v.string(), 
        address: v.string()
    })
    .index("by_provider_name", ["provider_name"])
    .index("by_verified_provider", ["verified_provider"])
    .index("by_price", ["price"])
    .index("by_expiry_time", ["expiry_time"]),
    orders: defineTable({
        listings_id : v.id("listings"),
        buyer_name: v.string(),
        quantity : v.number(),
        order_status : v.string()
    }),
  });