var express = require("express");
var router = express.Router();

const {
  getAllComments,
  getAllCommentsForSpecificSong,
  createComment,
  updateComment,
  deleteSingleComment
} = require("../db/queries/commentsQueries.js");

router.get("/", getAllComments);
router.get("/bySong/:id", getAllCommentsForSpecificSong);
router.post("/",createComment);
router.patch("/:id",updateComment)
router.delete("/:id", deleteSingleComment);
module.exports = router;
