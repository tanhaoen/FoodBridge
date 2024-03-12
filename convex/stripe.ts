"use node";
import { convexToJson, v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import Stripe from "stripe";

//this is the payment endpoint
export const pay = action({

    //takes in order_id, price
    args : {order_id : v.string(),
            price : v.float64()},

    handler : async (ctx, args) => {

        //instatiate Stripe object
        const stripe = new Stripe(process.env.SECRET_STRIPE_API_KEY!);
        const customer = await stripe.customers.create();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: args.price,
            currency: 'sgd',
            customer: customer.id,
            automatic_payment_methods: {
              enabled: true,
            },
          });

        //returns the Payment Intent’s client secret, 
        //the Ephemeral Key’s secret(optional, only for returning customers), the Customer’s id, 
        //and your publishable key
        return {
            paymentIntent: paymentIntent.client_secret,
            customer: customer.id,
            publishableKey: process.env.PUBLISHABLE_STRIPE_API_KEY!
        }
    }
});




