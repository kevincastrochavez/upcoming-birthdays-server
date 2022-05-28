const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllFriends = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('friends').find();

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to find a friend');
    }

    const urlId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .find({ _id: urlId });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFriend = async (req, res) => {
  try {
    const friend = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdayDate: req.body.birthdayDate,
      giftIdea: req.body.giftIdea,
      favoriteSnack: req.body.favoriteSnack,
      throwParty: req.body.throwParty,
      spotlight: req.body.spotlight,
      descriptionOfDreamDay: req.body.descriptionOfDreamDay,
      avatarPicture: req.body.avatarPicture,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .insertOne(friend);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(`An error occurred creating a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to update a friend.');
    }

    const friendId = new ObjectId(req.params.id);

    const friend = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdayDate: req.body.birthdayDate,
      giftIdea: req.body.giftIdea,
      favoriteSnack: req.body.favoriteSnack,
      throwParty: req.body.throwParty,
      spotlight: req.body.spotlight,
      descriptionOfDreamDay: req.body.descriptionOfDreamDay,
      avatarPicture: req.body.avatarPicture,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .replaceOne({ _id: friendId }, friend);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred updating a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to delete a friend.');
    }

    const friendId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .remove({ _id: friendId }, true);

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred deleting a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFriends,
  getFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};
