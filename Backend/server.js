const http = require("http");
const app = require("./app");
const { dbConnect } = require("./config/dbConnect");
require("dotenv").config();

dbConnect();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
