const mongodb = require('../db/connect');

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('users').find();

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
};
