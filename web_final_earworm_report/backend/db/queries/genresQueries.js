const { db } = require("./index.js");

const getAllGenres = (req, res, next) => {
  db.any(
    "SELECT * FROM genres"
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all genres",
        genres: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};


const createGenre = (req, res, next) => {
  db.none('INSERT INTO genres(genre_name) VALUES(${genre_name})', req.body)
  .then(() => {
    res.status(200)
    .json({
      status: "success",
      message: "New genre has been added"
    })
  })
  .catch(err => {
    return next(err);
  })
}


module.exports = {
  getAllGenres,
  createGenre

};
