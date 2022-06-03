const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger-output.json');
const friendsRoutes = require('./routes/friends');
const usersRoutes = require('./routes/users');
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
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/friends', friendsRoutes)
  .use('/users', usersRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
