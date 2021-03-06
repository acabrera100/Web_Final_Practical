const { db } = require("./index.js");

const getAllFavorites = (req, res, next) => {
  db.any(
    "SELECT favorites.id,song_id, title,username,favorites.user_id FROM favorites JOIN songs  ON favorites.song_id = songs.id JOIN users  ON favorites.user_id = users.id"
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all favorites",
        favorites: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getAllFavoritesSpecificSong = (req, res, next) => {
  let songName = req.params.id;
  db.any(
    "SELECT favorites.id,song_id, title,username,favorites.user_id FROM favorites JOIN songs  ON favorites.song_id = songs.id JOIN users  ON favorites.user_id = users.id WHERE title = $1",
    [songName]
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all users",
        favoritesBySong: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getAllFavoritesByUser = (req, res, next) => {
  let userId = req.params.id;
  db.any(
    "SELECT favorites.id,song_id, title,img_url,username,favorites.user_id FROM favorites JOIN songs  ON favorites.song_id = songs.id JOIN users  ON favorites.user_id = users.id WHERE favorites.user_id = $1",
    [userId]
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all songs by this User",
        favoritesByUser: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const createFavoriteOnSong = (req, res, next) => {
  console.log(req.body);
  db.none(
    "INSERT INTO favorites(user_id,song_id) VALUES ( ${user_id}, ${song_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "New favorite has been added to song"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSingleFavorite = (req, res, next) => {
  let favoritesId = parseInt(req.params.id);
  let userId = parseInt(req.params.user);
  db.result("DELETE FROM favorites WHERE song_id=$1 AND user_id =$1", [favoritesId,userId] )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "The favorite has been un favored "
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllFavorites,
  getAllFavoritesSpecificSong,
  getAllFavoritesByUser,
  createFavoriteOnSong,
  deleteSingleFavorite
};
