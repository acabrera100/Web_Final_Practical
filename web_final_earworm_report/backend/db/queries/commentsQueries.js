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

const getAllCommentsPostedByUser = (req, res, next) => {
  let userId = req.params.id;
  db.any(
    "SELECT  songs.id AS songID ,comments.id,username,comment_body FROM songs  JOIN users ON users.id = songs.user_id JOIN comments ON comments.user_id = users.id WHERE users.id = $1 AND songs.id = comments.song_id GROUP BY songID, comments.id,username,comment_body",
    [userId]
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
      })
    }).then(()=>{
      console.log("ENTERED")
    })
    .catch(err => {
      return next(err);
    });
};
// PUT REQUEST

// const updateComment = (req, res, next) => {
//   db.none(
//     'UPDATE comments SET comment_body = ${comment_body},user_id=${user_id}' +
//       ', song_id=${song_id} WHERE id=${id}',
//     {
//
//       comment_body: req.body.comment_body,
//       user_id: parseInt(req.body.user_id),
//       song_id: parseInt(req.body.song_id),
//       id: parseInt(req.params.id)
//     })
//     .then(() => {
//       res.status(200).json({
//         status: "success",
//         message: "You Updated A Comment"
//       });
//     })
//     .catch(err => {
//       return next(err);
//     });
// };
// PATCH REQEUST (partial update)
const updateComment = (req, res, next) => {
  db.none(
    "UPDATE comments SET user_id=${user_id}, comment_body=${comment_body} WHERE id=${id}",
    {
      user_id: parseInt(req.body.user_id),
      comment_body: req.body.comment_body,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "You Updated a Comment in the Database!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSingleComment = (req, res, next) => {
  let commentId = parseInt(req.params.id);
  db.result("DELETE FROM comments WHERE id=$1", commentId)
    .then(body => {
      res.status(200).json({
        status: "success",
        message: " Removed Comment from Database"
      });
    })
    .catch(err => {
      return next(err);
    });
};
module.exports = {
  getAllComments,
  getAllCommentsPostedByUser,
  getAllCommentsForSpecificSong,
  createComment,
  updateComment,
  deleteSingleComment
};
