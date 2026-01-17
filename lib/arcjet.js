import arcjet, { tokenBucket } from "@arcjet/next";

// Create Arcjet client with rate limiting rules
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // Rate limit by IP address
    rules: [
        // Token bucket rate limiting for AI API calls
        // 10 tokens max, refills 5 tokens per hour
        // Each request consumes 1 token
        tokenBucket({
            mode: "LIVE", // Enforce the rule (use "DRY_RUN" for testing)
            refillRate: 5, // Refill 5 tokens
            interval: "1h", // Per hour
            capacity: 10, // Maximum 10 tokens
        }),
    ],
});

export default aj;
