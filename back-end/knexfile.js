require("dotenv").config();
const { DATABASE_URL } = process.env;
console.log(DATABASE_URL)

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
  },
  production: {
    client: "postgresql",
    connection: DATABASE_URL,
  }
};