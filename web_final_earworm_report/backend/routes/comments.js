var express = require("express");
var router = express.Router();

const {
  getAllComments,
  getAllCommentsForSpecificSong,
  createComment,
  updateComment
} = require("../db/queries/commentsQueries.js");

router.get("/", getAllComments);
router.get("/bySong/:id", getAllCommentsForSpecificSong);
router.post("/",createComment);
router.patch("/:id",updateComment)
module.exports = router;
