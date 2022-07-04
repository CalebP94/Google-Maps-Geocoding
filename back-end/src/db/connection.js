const env = process.env.NODE_ENV || "development";
console.log(env)
const config = require("../../knexfile")[env];
console.log(config)
const knex = require("knex")(config);


module.exports = knex;