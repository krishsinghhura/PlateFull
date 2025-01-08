const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://snuuphlknlydusnrkjjz.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudXVwaGxrbmx5ZHVzbnJramp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODA5NzYsImV4cCI6MjA1MTY1Njk3Nn0.6UAYN4dAxLgyY1QR2eqBStN8fThfufjDEx83PIBhNV0";

if (!SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY is missing in the environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
