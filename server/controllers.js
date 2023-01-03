const { Pool, Client } = require("pg");

const credentials = {
  user: "admin",
  host: "localhost",
  database: "sdc",
  password: "password",
  port: 5432,
};

const client = new Client(credentials);
client.connect();

const getReviews = (product_id) => {
  return client.query(`EXPLAIN ANALYZE SELECT * FROM reviews
  WHERE product_id = ${product_id}
  `)
};

const getReviewMetadata = (product_id) => {
  let result = {};
  //get characteristic value data for each review
  client.query(`select cr.characteristic_id, cr.review_id, cr.value from characteristic_reviews cr inner join reviews r on cr.review_id = r.id where product_id = ${product_id};`)
  .then((response) => {
    //add the data to our object that will eventually be returned
    console.log(response.rows);
    //query for the recommended count on reviews
    return client.query(`select recommend, rating from reviews where product_id = ${product_id}`)
  }).then((response) => {
    console.log(response.rows);
    //iterate over reviews and tally for returned object
  })
}

// getReviews(1).then((response) => {
//   console.log(response.rows);
// })

getReviewMetadata(1);

module.exports = {
  getReviews,
  getReviewMetadata
}

