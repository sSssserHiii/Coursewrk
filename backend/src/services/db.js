const Pool = require("pg").Pool;

module.exports = function dynamicPool(role = "connect_user") {
  console.log(process.env.connect_user_pass);
  return new Pool({
    user: `${role}`,
    password: process.env[`${role}_pass`],
    host: "localhost",
    port: "5432",
    database: "warehouse",
  });
};