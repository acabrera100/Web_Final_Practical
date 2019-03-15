const { db } = require("./index.js");

const getAllComments = (req, res, next) => {
  db.any(
    "SELECT comments.id,comments.user_id,username,comment_body,title,comments.song_id FROM comments JOIN users ON comments.user_id = users.id JOIN songs  ON comments.song_id = songs.id"
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all comments",
        comments: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const getAllCommentsForSpecificSong = (req, res, next) => {
  let songName = req.params.id;
  db.any(
    "SELECT comments.id,comments.user_id,username,comment_body,title,comments.song_id FROM comments JOIN users ON comments.user_id = users.id JOIN songs  ON comments.song_id = songs.id WHERE songs.title = $1",
    [songName]
  )
    .then(data => {
      res.json({
        status: "success",
        message: "Retrieved all comments for a specific song",
        commentsBySong: data
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

const createComment = (req, res, next) => {
  db.none(
    "INSERT INTO comments(comment_body,user_id,song_id) VALUES ( ${comment_body}, ${user_id}, ${song_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "New comment has been added to a song"
      });
    })
    .catch(err => {
      return next(err);
    });
};
module.exports = {
  getAllComments,
  getAllCommentsForSpecificSong,
  createComment
};
