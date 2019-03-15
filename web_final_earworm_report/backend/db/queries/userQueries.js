const { db } = require("./index.js");

const getAllUsers = (req, res, next) => {
  db.any(
    "SELECT * FROM users"
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all users",
        users: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getSingleUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.one(
    "SELECT * FROM users WHERE users.id =$1",
    [userId]
  )
    .then(data => {
      res.status(200);
      res.json({
        status: "success",
        message: "Retrieved a single user",
        user: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const createUser = (req, res, next) => {
  db.none('INSERT INTO users(username) VALUES(${username})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: "success",
      message: "New user has been created"
    })
  })
  .catch(err => {
    return next(err);
  })
}

const deleteUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result("DELETE FROM users WHERE id=$1", userId)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "The user has been removed from this site"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser
};
