const express = require('express');
const path = require('path');
// const cors = require('cors');
let {getReviews, getReviewMetadata} = require('./controllers.js');

const { Pool, Client } = require("pg");

const credentials = {
  user: "admin",
  host: "localhost",
  database: "sdc",
  password: "password",
  port: 5432,
};

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());

app.get('/reviews', (req, res) => {
  getReviews(req.query.product_id, req.query.page, req.query.count, req.query.sort).then((response) => {
    res.send(response);
  })
});

app.get('/reviews/meta', (req, res) => {

  getReviewMetadata(req.query.product_id).then((response) => {
    res.send(response);
  })

});


app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on 3000`);
});