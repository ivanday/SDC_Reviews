const { Pool, Client } = require("pg");

const credentials = {
  user: "admin",
  host: "localhost",
  database: "sdc",
  password: "password",
  port: 3000,
};

const client = new Client(credentials);
await client.connect();

const getReviews = (product_id) => {
  return client.query(`SELECT * FROM reviews WHERE product_id=${product_id}`)
};

module.exports = {
  getReviews;
}

