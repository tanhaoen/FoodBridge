import { defineSchema } from "convex/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the database
export default defineSchema({
    listings: defineTable({
        title: v.string(), 
        description: v.string(), 
        seller_id: v.id("users"),
        price: v.number(),
        quantity: v.number(), 
        expiry_time: v.number(),
        categories: v.array(v.string()),
        thumbnail_url: v.string(), 
        location: v.optional(v.object({
            latitude: v.number(),
            longitude: v.number()
        }))
    }).searchIndex("by_title", {
        searchField: "title",
    }),
    order_number: defineTable({
        order_number: v.number()
    }),
    orders: defineTable({
        listings_id : v.id("listings"),
        seller_id : v.id("users"),
        buyer_id: v.id("users"),
        quantity : v.number(),
        order_status : v.string()
    }),
    users: defineTable({
        username: v.string(),
        password: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        email: v.string(),
        phone: v.string(),
        verified: v.boolean(),
        level: v.number(),
        location: v.optional(v.object({latitude: v.number(), longitude: v.number()}))
    })
    .index("by_username", ["username"])
  });