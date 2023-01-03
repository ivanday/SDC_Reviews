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
  return client.query(`SELECT * FROM reviews
  WHERE product_id = ${product_id}
  `)
};

const getReviewMetadata = (product_id) => {
  //initialize result object
  let result = {
    'product_id': product_id,
    'ratings': {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    },
    'recommended': {
      'false': 0,
      'true': 0
    },
    'characteristics': {}
  };
  //get characteristic value data for each review
  client.query(`select cr.characteristic_id, cr.review_id, cr.value, "c".name from characteristic_reviews cr inner join reviews r on cr.review_id = r.id inner join "characteristics" "c" on cr.characteristic_id = "c".id where r.product_id = ${product_id};`)
  .then((response) => {
    //set the characteristics names and values
    response.rows.forEach((row) => {
      if (result.characteristics[row.name]) {
        result.characteristics[row.name].value.push(row.value);
      } else {
        result.characteristics[row.name] = {'id': row.value, 'value': [row.value]};
      }
    })
  })
  .then((response) => {
    //query for the recommended count on reviews
    return client.query(`select recommend, rating from reviews where product_id = ${product_id}`)
  })
  .then((response) => {
    //iterate over reviews and tally for returned object
    response.rows.forEach((row) => {
      result.ratings[row.rating] += 1;
      result.recommended[row.recommend] += 1;
    })
    return result;
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

