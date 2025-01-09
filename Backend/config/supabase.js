const { createClient } = require("@supabase/supabase-js");

require("dotenv").config(); // Add this line at the top of the file

const SUPABASE_URL = "https://snuuphlknlydusnrkjjz.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY is missing in the environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
