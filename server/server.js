const express = require('express');
const path = require('path');
// const cors = require('cors');
let {getReviews} = require('./controllers.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());

app.get('/reviews/:product_id', (req, res) => {
  getReviews(req.query.product_id);
});


app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on 3000`);
});