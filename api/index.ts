// Vercel serverless function wrapper for Express app
// This allows Vercel to run the Express app as a serverless function

import { app } from "../server/app";

// Export the Express app - Vercel will handle it as a serverless function
export default app;

