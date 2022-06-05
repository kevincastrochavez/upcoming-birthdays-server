const validator = require('../helpers/validate');

const saveFriend = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthdayDate: 'required|string',
    giftIdea: 'required|string',
    favoriteSnack: 'string',
    throwParty: 'required|boolean',
    spotlight: 'required|boolean',
    descriptionOfDreamDay: 'required|string',
    avatarPicture: 'string',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Problem creating or updating a new friend',
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    userName: 'required|string',
    password: 'required|string',
    isAdmin: 'required|boolean',
    friends: 'array',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Problem creating or updating a new user',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveFriend,
  saveUser,
};
