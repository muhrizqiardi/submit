const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.test.local") });

const config = {
  use: {
    baseURL: "http://localhost:9000",
  },
};

module.exports = config;
