var express = require("express");
var router = express.Router();

const {
  getAllComments,
  getAllCommentsForSpecificSong,
  createComment
} = require("../db/queries/commentsQueries.js");

router.get("/", getAllComments);
router.get("/bySong/:id", getAllCommentsForSpecificSong);
router.post("/",createComment);
module.exports = router;
