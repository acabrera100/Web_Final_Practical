const { db } = require("./index.js");

const getAllSongs = (req, res, next) => {
  db.any(
    "SELECT title,ARRAY_AGG(DISTINCT comments.comment_body) AS Comments,songs.id,artist,img_url,username , favorites_counts.count AS favorites " +
      "FROM songs LEFT JOIN users ON songs.user_id = users.id " +
      "LEFT JOIN comments ON comments.song_id = songs.id " +
      "JOIN (SELECT favorites.song_id,COUNT(favorites.song_id) " +
      "FROM favorites GROUP BY favorites.song_id) AS favorites_counts " +
      "ON favorites_counts.song_id = songs.id " +
      "GROUP BY title,songs.id,artist,img_url,username,favorites"
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
const getAllSongsbyPopularity = (req, res, next) => {
  db.any(
    "SELECT title,genre_name,ARRAY_AGG(DISTINCT comments.comment_body) AS Comments,COUNT(favorites.song_id)AS Favorites,songs.id,artist,img_url,username FROM songs FULL JOIN users ON songs.user_id = users.id FULL JOIN comments ON comments.song_id = songs.id FULL JOIN favorites ON favorites.song_id = songs.id FULL JOIN genres ON songs.genre_id = genres.id GROUP BY title,genre_name,songs.id,artist,img_url,username ORDER BY Favorites DESC"
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
    "SELECT title,username,artist,img_url,COUNT(favorites.song_id)AS favorites ,ARRAY_AGG(DISTINCT comments.comment_body) AS comments FROM songs FULL JOIN favorites ON favorites.song_id = songs.id FULL JOIN genres ON genres.id = songs.genre_id FULL JOIN comments ON comments.song_id = songs.id FULL JOIN users ON songs.user_id = users.id WHERE genre_name = $1 GROUP BY title,artist,img_url,username ORDER BY favorites DESC",
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
  let userName = parseInt(req.params.id);
  db.any(
    "SELECT title,ARRAY_AGG(DISTINCT comments.comment_body) AS Comments,COUNT(favorites.song_id)AS Favorites,songs.id,artist,img_url,username FROM songs FULL JOIN users ON songs.user_id = users.id FULL JOIN comments ON comments.song_id = songs.id FULL JOIN favorites ON favorites.song_id = songs.id WHERE users.id = $1 GROUP BY title,songs.id,artist,img_url,username",
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
  getAllSongsbyPopularity,
  getAllSongsForSpecificGenre,
  getAllSongsBySpecificUser,
  getSingleSong,
  createSong,
  deleteSong
};

// SELECT title,genre_name,ARRAY_AGG(DISTINCT comments.comment_body) AS Comments,COUNT(favorites.song_id)AS Favorites,songs.id,artist,img_url,username FROM songs FULL JOIN users ON songs.user_id = users.id FULL JOIN comments ON comments.song_id = songs.id FULL JOIN favorites ON favorites.song_id = songs.id FULL JOIN genres ON songs.genre_id = genres.id GROUP BY title,genre_name,songs.id,artist,img_url,username
// 1)
// "SELECT genre_name,comments.id AS com,songs.id,title,artist,img_url,username,date_added,comment_body ,COUNT(favorites.song_id)AS Favorites FROM songs JOIN favorites ON favorites.song_id = songs.id JOIN users ON songs.user_id = users.id JOIN comments ON songs.id = comments.song_id JOIN genres ON songs.genre_id = genres.id WHERE songs.id = comments.song_id GROUP BY genre_name,comments.id,songs.id,title,artist,comment_body,username,img_url, date_added ORDER BY DATE(date_added) DESC"

// 2)
// SELECT title,ARRAY_AGG(DISTINCT comments.comment_body) AS Comments,COUNT(favorites.song_id)AS Favorites,songs.id,artist,img_url,username
// FROM songs
// FULL JOIN users
// ON songs.user_id = users.id
// FULL JOIN comments
// ON comments.song_id = songs.id
// FULL JOIN favorites
// ON favorites.song_id = songs.id
// GROUP BY title,songs.id,artist,img_url,username
