const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const swaggerDocument = require('./swagger-output.json');
const friendsRoutes = require('./routes/friends');
const usersRoutes = require('./routes/users');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(cors());
app.use(auth(config));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/friends', requiresAuth(), friendsRoutes);
app.use('/users', requiresAuth(), usersRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port:${port}`);
  }
});
