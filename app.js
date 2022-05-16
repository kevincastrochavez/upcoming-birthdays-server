const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const friendsRoutes = require('./routes/friends');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
  })
  .use('/friends', friendsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
