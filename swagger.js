const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Birthday API',
    description:
      "This is an API to store friends birthday's information like birthdate, gift idea, favorite snack, etc",
  },
  host: 'upcoming-birthdays.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/friends.js', './routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
