const express = require('express');
const path = require('path');
// const cors = require('cors');
let {getReviews, getReviewMetadata, postReview, updateHelpful} = require('./controllers.js');

const { Pool, Client } = require("pg");

const credentials = {
  user: "admin",
  host: "localhost",
  database: "sdc",
  password: "password",
  port: 5432,
};

const app = express();
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
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

app.post('/reviews', (req, res) => {
  postReview(req.body).then((response) => {
    res.status(201).end();
  }).catch((err) => {
    res.send(err);
    res.status(400).end();
  })
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  updateHelpful(req.params.review_id)
  .then((response) => {
    res.status(204).end();
  })
  .catch((err) => {
    res.send(err);
    res.status(400).end();
  })
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on 3000`);
});