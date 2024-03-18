import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
    "reset order number",
    { hours: 1}, // Every 1 hour
    internal.order_number.resetOrderNumber,
);

export default crons;