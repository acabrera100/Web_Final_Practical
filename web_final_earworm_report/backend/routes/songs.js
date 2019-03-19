var express = require("express");
var router = express.Router();

const {
  getAllSongs,
  getSingleSong,
  getAllSongsbyPopularity,
  getAllSongsForSpecificGenre,
  getAllSongsBySpecificUser,
  createSong,
  deleteSong
} = require("../db/queries/songsQueries.js");

router.get("/", getAllSongs);
router.get("/byPop", getAllSongsbyPopularity);
router.get("/:id", getSingleSong);
router.get("/byGenre/:id", getAllSongsForSpecificGenre);
router.get("/byUser/:id", getAllSongsBySpecificUser);
router.post("/", createSong);
router.delete("/:id", deleteSong);

module.exports = router;
