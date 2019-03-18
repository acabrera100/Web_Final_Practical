const { db } = require("./index.js");

const getAllSongs = (req, res, next) => {
  db.any(
    "SELECT songs.id,title,artist,img_url,username,date_added ,COUNT(song_id)AS Favorites FROM songs JOIN favorites ON favorites.song_id = songs.id JOIN users ON songs.user_id = users.id GROUP BY title,artist,username,img_url, date_added,songs.id ORDER BY DATE(date_added) DESC"
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all songs",
        songs: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getAllSongsForSpecificGenre = (req, res, next) => {
  let genreName = req.params.id;
  db.any(
    "SELECT title,artist,img_url,COUNT(song_id)AS Likes FROM songs JOIN favorites ON favorites.song_id = songs.id JOIN genres ON genres.id = songs.genre_id WHERE genre_name = $1 GROUP BY title,artist,img_url ORDER BY likes DESC",
    [genreName]
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all songs",
        songs: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getAllSongsBySpecificUser = (req, res, next) => {
  let userName = req.params.id;
  db.any(
    "SELECT title,artist,img_url,genre_name,COUNT(song_id)AS Likes FROM songs JOIN favorites ON favorites.song_id = songs.id JOIN genres  ON genres.id = songs.genre_id JOIN users ON users.id = songs.user_id WHERE username = $1 GROUP BY title,artist,genre_name,img_url ORDER BY likes DESC",
    [userName]
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all songs",
        songs: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getSingleSong = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.one("SELECT * FROM songs WHERE songs.id =$1", [userId])
    .then(data => {
      res.status(200);
      res.json({
        status: "success",
        message: "Retrieved a single user",
        song: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const createSong = (req, res, next) => {
  db.none(
    "INSERT INTO songs(title, artist, img_url, user_id, genre_id) VALUES ( ${title}, ${artist}, ${img_url}, ${user_id}, ${genre_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "New song has been posted"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSong = (req, res, next) => {
  let songId = req.params.id;
  db.result("DELETE FROM songs WHERE id=$1", songId)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "The song has been removed"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllSongs,
  getAllSongsForSpecificGenre,
  getAllSongsBySpecificUser,
  getSingleSong,
  createSong,
  deleteSong
};
