var express = require("express");
var router = express.Router();

const {
  getAllComments,
  getAllCommentsPostedByUser,
  getAllCommentsForSpecificSong,
  createComment,
  updateComment,
  deleteSingleComment
} = require("../db/queries/commentsQueries.js");

router.get("/", getAllComments);
router.get("/byUser/:id", getAllCommentsPostedByUser);
router.get("/bySong/:id", getAllCommentsForSpecificSong);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteSingleComment);
module.exports = router;
