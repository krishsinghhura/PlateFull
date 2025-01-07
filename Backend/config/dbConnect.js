const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  const c = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected ${c.connection.host}`);
};

module.exports = {
  dbConnect,
};
